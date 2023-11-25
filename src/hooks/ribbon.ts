import _ from 'lodash';
import { TweenMax, Power2 } from 'gsap';

interface State {
    type: string;
    start: {thickness: number; top: number; left: number};
    end: {thickness: number, top: number, left: number};
    wave: {amplitude: number, frequency: number, transitionSpeed: number};
}

interface Block {
	type: string;
    title: string;
    id: string,
    position: {current: number, target: number, home?: number};
    width: number;
    highlight?: boolean;
    svg?: { group?: any, box?: any, mask?:any, textpath?: any, text?: any};
    row?: number;
    textSize?: {current: number, target: number};
}

export class Ribbon
{	
    rootPos: number = Math.random() * 100;
	svg: any;

    states = {
        start: { 
            type: 'start',
            start: {thickness: 1, top: 60, left: 0 },
            end: {thickness: 1, top: 60, left: 100 },
            wave: {amplitude: 0, frequency: 0.008, transitionSpeed: 0.2}
        },
        home: { 
            type: 'home',
            start: {thickness: 12, top: 60, left: 0},
            end: {thickness: 12, top: 60, left: 100},
            wave: {amplitude: 40, frequency: 0.015, transitionSpeed: -0.5}
        },
        selected: {
            type: 'selected',
            start: {thickness: 12, top: 60, left: 0},
            end: {thickness: 12, top: 60, left: 100},
            wave: {amplitude: 50, frequency: 0.004, transitionSpeed: 0.3}
        }
    }

    guidePath: any[] = [];

    size = { svg: { width: window.innerWidth, height: window.innerHeight}};
    currentState: State = JSON.parse(JSON.stringify(this.states.start));

    topWaveGuideLine: any;
    bottomWaveGuideLine: any;
    ribbon: any;
    rows = 3;
    paths: any[] = [];
    lines: any[] = [];
    blocks: Block[] = [];

    defaultRestSpeed = 0.009;
    speed = {
        changeState: 2, 
        rest: 1
    };

    waveLineAttr = {
        fill: 'none',
        stroke: 'white',
        strokeWidth: 1,
    }

	constructor(svg: any) 
	{
        this.svg = svg;
    }

    init() 
    {
        this.blocks = [
            
             {
				type: 'menu',
                id: '1',
                title: 'Home',
                position: {current: 105, target: 5, home: 5},
                width: 20,
                row: 2
            },
            {
				type: 'menu',
                id: '2',
                title: 'Projects',
                position: {current: 137, target: 37, home: 37},
                width: 20,
                row: 3
            },
            {
				type: 'menu',
                title: 'About Me',
                id: '3',
                position: {current: 147, target: 47, home: 47},
                width: 20,
                row: 1,

            },
            {
				type: 'menu',
                id: '4',
                title: 'Contact',
                position: {current: 175, target: 75, home: 75},
                width: 20,
                row: 2
            },
            {
				type: 'back',
                id: 'back',
                title: '< Back',
                position: {current: -100, target: -100, home: -100},
                width: 10,
                row: 1
            }
        ]

        this.ribbon = this.svg.polygon().attr(
        {
            fill: '#3c5952',
            stroke: 'none'
        });   
        
       // this.topWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
       // this.bottomWaveGuideLine = this.svg.path().attr(this.waveLineAttr);
        
        this.resizeSVG();
        this.tick(0);
        this.updateRibbon();

        setTimeout(() => {
            this.setState(this.states.home);
        },
        1000);
    }

    updateRibbon()
    {
        var freq = this.currentState.wave.frequency;
        var pos = this.rootPos;
        var amp = this.currentState.wave.amplitude;
        var x1 = (this.size.svg.width / 100) * this.currentState.start.left;
        var y1 = ((this.size.svg.height / 100) * this.currentState.start.top);
        var x2 = (this.size.svg.width / 100) * this.currentState.end.left;
        var y2 = (this.size.svg.height / 100) * this.currentState.end.top;

        var t1 = ((this.size.svg.height / 100) * this.currentState.start.thickness) / 2
        var t2 = ((this.size.svg.height / 100) * this.currentState.end.thickness) / 2

        this.guidePath = this.getGuidePath(freq, pos, amp, x1, y1, x2, y2);

        var topPathPoints = this.getPathOffset(this.guidePath, -t1, -t2);  

        this.paths = [topPathPoints];

        if(this.rows > 1)
        {
            var startHeightSpace = ((this.size.svg.height / 100) * this.currentState.start.thickness);
            var endHeightSpace = ((this.size.svg.height / 100) * this.currentState.end.thickness);

            for(let i = 1; i < this.rows; i++ )
            {
                var startOffset = (0-(startHeightSpace / 2)) + ((startHeightSpace / this.rows) * i);
                var endOffset = (0-(endHeightSpace / 2)) + ((endHeightSpace / this.rows) * i);
                var path = this.getPathOffset(this.guidePath, startOffset, endOffset);
                this.paths.push(path);

                if(!this.lines[i-1]) this.lines.push(this.svg.path().attr(this.waveLineAttr))
                this.lines[i-1].attr({d: this.getWavePathString(path)})
            }
        }

        var bottomPath = this.getPathOffset(this.guidePath, t1, t2);  
        this.paths.push(bottomPath);

        this.ribbon.attr({points: this.getWavePolygon(topPathPoints, bottomPath.slice(0).reverse())})

        for(var i = 0; i < this.blocks.length; i++)
        {
            var block = this.blocks[i];
            var startX = (this.size.svg.width / 100) * block.position.current; 
            var endX = (this.size.svg.width / 100) * (block.position.current + block.width);
            
            if(startX > this.size.svg.width) startX = this.size.svg.width;
            else if(startX < 0) startX = 0;

            if(endX > this.size.svg.width) endX = this.size.svg.width;
            else if(endX < 0) endX = 0;
            
            var path1 = block.row && this.paths[block.row - 1];
            var path2 = block.row && this.paths[block.row];
            
            var chunk1 = path1.slice(startX, endX);
            var chunk2 = path2.slice(startX, endX);

            if(chunk1.length > 1 && chunk2.length > 1)
            {
                var textPaddingX = 20;
                var textPaddingY = 10;
                var fontSize = this.getBlockFontSize(chunk1, chunk2, textPaddingY);
                var boxPolyPoints = this.getWavePolygon(chunk1, chunk2.reverse());

                if(!block.svg)
                { 
                    block.svg = {}
                    block.svg.group = this.svg.group().attr({class: 'block', id:block.id})
                    block.svg.group.click((e:any) => { this.onBlockClick(e); });
                    block.svg.box = block.svg.group.polygon().attr({fill: 'white', stroke: 'none'})
                    block.svg.mask = this.svg.polygon().attr({fill: 'white', stroke: 'none'}).toDefs();
                    block.svg.textpath = block.svg.group.path().attr({fill: 'none', stroke: 'white'}).toDefs();
                    block.svg.text = block.svg.group.text(0, 0, block.title).attr({textpath: block.svg.textpath, mask: block.svg.mask});
                }

                block.svg.box.attr({points: boxPolyPoints});
                block.svg.mask.attr({points: boxPolyPoints});
                block.svg.text.attr({fontSize: fontSize});
                
                if(endX - startX > textPaddingX * 2)
                {
                    var newPath = this.getPathOffset(path2.slice(startX + textPaddingX, endX - textPaddingX), -textPaddingY, -textPaddingY);
                    if(newPath.length > 2) 
                    {
                        var newPathString = this.getWavePathString(newPath);
                        block.svg.textpath.attr({d: newPathString});
                    }
                }
            }
            else
            {
                if(block.svg)
                {
                    block.svg.group.remove();
                    block.svg.mask.remove();
                    block.svg = undefined;
                } 
            }
        }
    }

    getGuidePath(freq: number, pos: number, amp: number, x1:number, y1: number, x2: number, y2: number)
    {
        var points: any[] = [];
        var width = x2 - x1;
        var x = x1;
        var y = y1;

        var yChange = y2 - y1;

        while (x++ <= width) 
        {           
            y = Math.sin(x * freq + pos)
            points.push([x, (y1 + ((width - (width - x)) * (yChange / width)) + (y * amp / 2 + amp / 2))])
        }
        return points;    
    }

    getPathOffset(points: any[], offsetStart: number, offsetEnd: number)
    {
        if(points.length)
        {
            var x1 = points[0][0];
            // var y1 = points[0][1];
            var x2 = points[points.length -1][0];
            // var y2 = points[points.length -1][1];

            var yChange = offsetStart - offsetEnd;
            var width = x1 - x2;

            let newPoints: any[] = [];
            for(let i = 0; i < points.length; i++)
            {
                var newPoint = [points[i][0], points[i][1]];
                newPoint[1] += offsetStart + ((width - (width - i)) * (yChange / width))
                newPoints.push(newPoint)
            }

            return newPoints;
        }
        return [];
    }

    getBlockFontSize(topPoints:any[], bottomPoints:any[], padding:number, maxSize:number = 40, minSize:number = 10)
    {
        var startHeight = Math.abs(topPoints[0][1] - bottomPoints[0][1]);
        var endHeight = Math.abs(topPoints[topPoints.length - 1][1] - bottomPoints[bottomPoints.length - 1][1]);

        var space = startHeight < endHeight ? startHeight : endHeight;

        space -= padding * 2;

        if(space < minSize) space = minSize;
        if(space > maxSize) space = maxSize;

        return space;
    }

    getWavePathString(points: any[])
    {
       // if(points.length < 2) return '';
        var mapped = _.map(points, (d:any[]) => {
            return d.join(',');
        });
        return 'M' + mapped.join(' ');      
    }

    getWavePolygon(topPoints:any[], bottomPoints:any[])
    {
        var allPoints = topPoints.concat(bottomPoints);
        var polyString = '';
        for(let i = 0; i < allPoints.length; i++)
        {
            polyString += allPoints[i].join(' ') + ' ';
        }

        return polyString;
    }

    onBlockClick(e: any) {
        let selectedBlock: string = "";
    
        // Use e.composedPath() if available, otherwise fallback to e.path
        const path = e.composedPath ? e.composedPath() : e.path;
    
        for (var i = 0; i < path.length; i++) {
            if (path[i].nodeName == 'g') {
                selectedBlock = path[i].id;
                break;
            }
        }
    
        if (selectedBlock) this.selectBlock(selectedBlock);
    }
    
    navigateToSection(sectionId: string) {
        switch (sectionId) {
            case '1': // Home
                this.scrollToSection('landing-section');
                break;
            case '2': // Projects
                this.scrollToSection('project-section');
                break;
            case '3': // About Me
                this.scrollToSection('about-section');
                break;
            case '4': // Contact
                this.scrollToSection('contact-section');
                break;
            case 'back':
                this.deselectBlock();
                break;
            default:
                break;
        }
    }

    scrollToSection(sectionId: string) {
        const sectionElement = document.getElementById(sectionId);
        if (sectionElement) {
            sectionElement.scrollIntoView({ behavior: 'smooth' });
        }
    }

    resizeSVG()
    {
        this.svg.attr(
            {
                width: this.size.svg.width,
                height: this.size.svg.height
            }
        )
    }

    onResize(event: any) 
    {
        this.size.svg.width = event.target.innerWidth;
        this.size.svg.height = event.target.innerHeight;
        if(this.svg) this.resizeSVG();
    }

    tick(c:number) 
    {
        if(c%2 == 0)
        {          
            // render 30fps
            this.rootPos += this.speed.rest;
            this.updateRibbon();
        }
        requestAnimationFrame( () => 
        {
            this.tick(c + 1)
        });
    }

    toogleState()
    {
        this.setState(this.currentState.type == 'home' ? this.states.selected : this.states.home);
    }

    selectBlock(blockId:string)
    {
		if(blockId === 'back') return this.deselectBlock();
		
        let selectedBlockPosition:number = 100;
        
        for(var i in this.blocks)
        {
            if(this.blocks[i].id === blockId || this.blocks[i].type === 'back')
            {
                selectedBlockPosition = this.blocks[i].position.current;
                this.blocks[i].position.target = this.blocks[i].type === 'back' ? 10 : 75;
            }
            else
            {
                const tempHome = this.blocks[i].position.home ?? 0;
                this.blocks[i].position.target = this.blocks[i].position.current < selectedBlockPosition ? tempHome - 100 : tempHome + 100;
            }
        }
        this.setState(this.states.selected);
    }

    deselectBlock()
    {
        for(var i in this.blocks)
        {
            const tempHome = this.blocks[i].position.home ?? 0;
            this.blocks[i].position.target = this.blocks[i].type == 'menu' ? tempHome : -100;
        }
        this.setState(this.states.home);
    }

    setState(newState: State)
    {
        // var transitionSpeed = 2;
        var ease = Power2.easeInOut;

        this.currentState.type = newState.type;

        TweenMax.to(this.currentState.start, this.speed.changeState, {top: newState.start.top, left: newState.start.left, thickness:newState.start.thickness, ease:ease});
        TweenMax.to(this.currentState.end, this.speed.changeState, {top: newState.end.top, left: newState.end.left, thickness:newState.end.thickness, ease:ease});
        TweenMax.to(this.currentState.wave, this.speed.changeState, {amplitude: newState.wave.amplitude, frequency: newState.wave.frequency, ease:ease});
        if(this.currentState.wave.transitionSpeed > this.speed.rest)
        {
            TweenMax.to(this.speed, this.speed.changeState / 2, {rest: newState.wave.transitionSpeed, ease: Power2.easeIn})
            TweenMax.to(this.speed, this.speed.changeState / 2, {rest: this.defaultRestSpeed, delay: this.speed.changeState / 2, ease: Power2.easeOut})
        }
        else
        {
             TweenMax.to(this.speed, this.speed.changeState, {rest: this.defaultRestSpeed, ease: ease})
        }

        for(var i = 0; i < this.blocks.length; i++)
        {
            var block = this.blocks[i];
            if(block.position.current !== block.position.target) TweenMax.to(block.position, this.speed.changeState, {current: block.position.target, ease: ease});
        }
    }
}


// let ribbon = new Ribbon(Snap('#svg'));
// ribbon.init();