"use strict";
class Ribbon {
    constructor(svg) {
        this.rootPos = Math.random() * 100;
        this.states = {
            start: {
                type: 'start',
                start: { thickness: 0, top: 60, left: 0 },
                end: { thickness: 0, top: 60, left: 100 },
                wave: { amplitude: 0, frequency: 0.008, transitionSpeed: 0.5 }
            },
            home: {
                type: 'home',
                start: { thickness: 30, top: 50, left: 0 },
                end: { thickness: 15, top: 60, left: 100 },
                wave: { amplitude: 40, frequency: 0.015, transitionSpeed: -0.5 }
            },
            selected: {
                type: 'selected',
                start: { thickness: 15, top: 80, left: 0 },
                end: { thickness: 24, top: 25, left: 100 },
                wave: { amplitude: 50, frequency: 0.004, transitionSpeed: 0.5 }
            }
        };
        this.size = { svg: { width: window.innerWidth, height: window.innerHeight } };
        this.currentState = JSON.parse(JSON.stringify(this.states.start));
        this.rows = 3;
        this.lines = [];
        this.blocks = [];
        this.defaultRestSpeed = 0.009;
        this.speed = {
            changeState: 2,
            rest: 1
        };
        this.waveLineAttr = {
            fill: 'none',
            stroke: 'white',
            strokeWidth: 1,
        };
        this.svg = svg;
    }
    init() {
        this.blocks = [
            {
                type: 'menu',
                id: '1',
                title: 'Products',
                position: { current: 105, target: 5, home: 5 },
                width: 20,
                row: 2
            },
            {
                type: 'menu',
                id: '2',
                title: 'Blog',
                position: { current: 137, target: 37, home: 37 },
                width: 10,
                row: 3
            },
            {
                type: 'menu',
                title: 'About Us',
                id: '3',
                position: { current: 147, target: 47, home: 47 },
                width: 20,
                row: 1,
            },
            {
                type: 'menu',
                id: '4',
                title: 'Contact',
                position: { current: 175, target: 75, home: 75 },
                width: 15,
                row: 2
            },
            {
                type: 'back',
                id: 'back',
                title: '<-- Back',
                position: { current: -100, target: -100, home: -100 },
                width: 10,
                row: 1
            }
        ];
        this.ribbon = this.svg.polygon().attr({
            fill: 'red',
            stroke: 'none'
        });
        // this.topWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
        // this.bottomWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
        this.resizeSVG();
        this.tick(0);
        this.updateRibbon();
        setTimeout(() => {
            this.setState(this.states.home);
        }, 1000);
    }
    updateRibbon() {
        var freq = this.currentState.wave.frequency;
        var pos = this.rootPos;
        var amp = this.currentState.wave.amplitude;
        var x1 = (this.size.svg.width / 100) * this.currentState.start.left;
        var y1 = ((this.size.svg.height / 100) * this.currentState.start.top);
        var x2 = (this.size.svg.width / 100) * this.currentState.end.left;
        var y2 = (this.size.svg.height / 100) * this.currentState.end.top;
        var t1 = ((this.size.svg.height / 100) * this.currentState.start.thickness) / 2;
        var t2 = ((this.size.svg.height / 100) * this.currentState.end.thickness) / 2;
        this.guidePath = this.getGuidePath(freq, pos, amp, x1, y1, x2, y2);
        var topPathPoints = this.getPathOffset(this.guidePath, -t1, -t2);
        this.paths = [topPathPoints];
        if (this.rows > 1) {
            var startHeightSpace = ((this.size.svg.height / 100) * this.currentState.start.thickness);
            var endHeightSpace = ((this.size.svg.height / 100) * this.currentState.end.thickness);
            for (let i = 1; i < this.rows; i++) {
                var startOffset = (0 - (startHeightSpace / 2)) + ((startHeightSpace / this.rows) * i);
                var endOffset = (0 - (endHeightSpace / 2)) + ((endHeightSpace / this.rows) * i);
                var path = this.getPathOffset(this.guidePath, startOffset, endOffset);
                this.paths.push(path);
                if (!this.lines[i - 1])
                    this.lines.push(this.svg.path().attr(this.waveLineAttr));
                this.lines[i - 1].attr({ d: this.getWavePathString(path) });
            }
        }
        var bottomPath = this.getPathOffset(this.guidePath, t1, t2);
        this.paths.push(bottomPath);
        this.ribbon.attr({ points: this.getWavePolygon(topPathPoints, bottomPath.slice(0).reverse()) });
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            var startX = (this.size.svg.width / 100) * block.position.current;
            var endX = (this.size.svg.width / 100) * (block.position.current + block.width);
            if (startX > this.size.svg.width)
                startX = this.size.svg.width;
            else if (startX < 0)
                startX = 0;
            if (endX > this.size.svg.width)
                endX = this.size.svg.width;
            else if (endX < 0)
                endX = 0;
            var path1 = this.paths[block.row - 1];
            var path2 = this.paths[block.row];
            var chunk1 = path1.slice(startX, endX);
            var chunk2 = path2.slice(startX, endX);
            if (chunk1.length > 1 && chunk2.length > 1) {
                var textPaddingX = 20;
                var textPaddingY = 10;
                var fontSize = this.getBlockFontSize(chunk1, chunk2, textPaddingY);
                var boxPolyPoints = this.getWavePolygon(chunk1, chunk2.reverse());
                if (!block.svg) {
                    block.svg = {};
                    block.svg.group = this.svg.group().attr({ class: 'block', id: block.id });
                    block.svg.group.click((e) => { this.onBlockClick(e); });
                    block.svg.box = block.svg.group.polygon().attr({ fill: 'white', stroke: 'none' });
                    block.svg.mask = this.svg.polygon().attr({ fill: 'white', stroke: 'none' }).toDefs();
                    block.svg.textpath = block.svg.group.path().attr({ fill: 'none', stroke: 'white' }).toDefs();
                    block.svg.text = block.svg.group.text(0, 0, block.title).attr({ textpath: block.svg.textpath, mask: block.svg.mask });
                }
                block.svg.box.attr({ points: boxPolyPoints });
                block.svg.mask.attr({ points: boxPolyPoints });
                block.svg.text.attr({ fontSize: fontSize });
                if (endX - startX > textPaddingX * 2) {
                    var newPath = this.getPathOffset(path2.slice(startX + textPaddingX, endX - textPaddingX), -textPaddingY, -textPaddingY);
                    if (newPath.length > 2) {
                        var newPathString = this.getWavePathString(newPath);
                        block.svg.textpath.attr({ d: newPathString });
                    }
                }
            }
            else {
                if (block.svg) {
                    block.svg.group.remove();
                    block.svg.mask.remove();
                    block.svg = null;
                }
            }
        }
    }
    getGuidePath(freq, pos, amp, x1, y1, x2, y2) {
        var points = [];
        var width = x2 - x1;
        var x = x1;
        var y = y1;
        var yChange = y2 - y1;
        while (x++ <= width) {
            y = Math.sin(x * freq + pos);
            points.push([x, (y1 + ((width - (width - x)) * (yChange / width)) + (y * amp / 2 + amp / 2))]);
        }
        return points;
    }
    getPathOffset(points, offsetStart, offsetEnd) {
        if (points.length) {
            var x1 = points[0][0];
            var y1 = points[0][1];
            var x2 = points[points.length - 1][0];
            var y2 = points[points.length - 1][1];
            var yChange = offsetStart - offsetEnd;
            var width = x1 - x2;
            let newPoints = [];
            for (let i = 0; i < points.length; i++) {
                var newPoint = [points[i][0], points[i][1]];
                newPoint[1] += offsetStart + ((width - (width - i)) * (yChange / width));
                newPoints.push(newPoint);
            }
            return newPoints;
        }
        return [];
    }
    getBlockFontSize(topPoints, bottomPoints, padding, maxSize = 40, minSize = 10) {
        var startHeight = Math.abs(topPoints[0][1] - bottomPoints[0][1]);
        var endHeight = Math.abs(topPoints[topPoints.length - 1][1] - bottomPoints[bottomPoints.length - 1][1]);
        var space = startHeight < endHeight ? startHeight : endHeight;
        space -= padding * 2;
        if (space < minSize)
            space = minSize;
        if (space > maxSize)
            space = maxSize;
        return space;
    }
    getWavePathString(points) {
        // if(points.length < 2) return '';
        var mapped = _.map(points, (d) => {
            return d.join(',');
        });
        return 'M' + mapped.join(' ');
    }
    getWavePolygon(topPoints, bottomPoints) {
        var allPoints = topPoints.concat(bottomPoints);
        var polyString = '';
        for (let i = 0; i < allPoints.length; i++) {
            polyString += allPoints[i].join(' ') + ' ';
        }
        return polyString;
    }
    onBlockClick(e) {
        let selectedBlock = null;
        for (var i = 0; i < e.path.length; i++) {
            if (e.path[i].nodeName == 'g') {
                selectedBlock = e.path[i].id;
                break;
            }
        }
        if (selectedBlock)
            this.selectBlock(selectedBlock);
    }
    resizeSVG() {
        this.svg.attr({
            width: this.size.svg.width,
            height: this.size.svg.height
        });
    }
    onResize(event) {
        this.size.svg.width = event.target.innerWidth;
        this.size.svg.height = event.target.innerHeight;
        if (this.svg)
            this.resizeSVG();
    }
    tick(c) {
        if (c % 2 == 0) {
            // render 30fps
            this.rootPos += this.speed.rest;
            this.updateRibbon();
        }
        requestAnimationFrame(() => {
            this.tick(c + 1);
        });
    }
    toogleState() {
        this.setState(this.currentState.type == 'home' ? this.states.selected : this.states.home);
    }
    selectBlock(blockId) {
        if (blockId === 'back')
            return this.deselectBlock();
        let selectedBlockPosition = 100;
        for (var i in this.blocks) {
            if (this.blocks[i].id === blockId || this.blocks[i].type === 'back') {
                selectedBlockPosition = this.blocks[i].position.current;
                this.blocks[i].position.target = this.blocks[i].type === 'back' ? 10 : 75;
            }
            else {
                this.blocks[i].position.target = this.blocks[i].position.current < selectedBlockPosition ? this.blocks[i].position.home - 100 : this.blocks[i].position.home + 100;
            }
        }
        this.setState(this.states.selected);
    }
    deselectBlock() {
        for (var i in this.blocks) {
            this.blocks[i].position.target = this.blocks[i].type == 'menu' ? this.blocks[i].position.home : -100;
        }
        this.setState(this.states.home);
    }
    setState(newState) {
        var transitionSpeed = 2;
        var ease = Power2.easeInOut;
        this.currentState.type = newState.type;
        TweenMax.to(this.currentState.start, this.speed.changeState, { top: newState.start.top, left: newState.start.left, thickness: newState.start.thickness, ease: ease });
        TweenMax.to(this.currentState.end, this.speed.changeState, { top: newState.end.top, left: newState.end.left, thickness: newState.end.thickness, ease: ease });
        TweenMax.to(this.currentState.wave, this.speed.changeState, { amplitude: newState.wave.amplitude, frequency: newState.wave.frequency, ease: ease });
        if (this.currentState.wave.transitionSpeed > this.speed.rest) {
            TweenMax.to(this.speed, this.speed.changeState / 2, { rest: newState.wave.transitionSpeed, ease: Power2.easeIn });
            TweenMax.to(this.speed, this.speed.changeState / 2, { rest: this.defaultRestSpeed, delay: this.speed.changeState / 2, ease: Power2.easeOut });
        }
        else {
            TweenMax.to(this.speed, this.speed.changeState, { rest: this.defaultRestSpeed, ease: ease });
        }
        for (var i = 0; i < this.blocks.length; i++) {
            var block = this.blocks[i];
            if (block.position.current !== block.position.target)
                TweenMax.to(block.position, this.speed.changeState, { current: block.position.target, ease: ease });
        }
    }
}
let ribbon = new Ribbon(Snap('#svg'));
ribbon.init();