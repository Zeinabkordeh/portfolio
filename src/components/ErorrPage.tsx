import { Box, Heading, Text } from "@chakra-ui/react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
// import NavBar from "../components/NavBar";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <>
      {/* <NavBar /> */}
      <Box padding={5}>
        <Heading as="h1" fontSize="6xl" marginBottom={4}>
          Oops
        </Heading>
        <Text>
          {isRouteErrorResponse(error)
            ? "Invalid address."
            : "Unexpected error happened."}
        </Text>
      </Box>
    </>
  );
};

export default ErrorPage;