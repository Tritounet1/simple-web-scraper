import {Button, Grid, GridItem} from "@chakra-ui/react"

const Home = () => {
    return(
        <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
            marginTop={"5%"}
            marginLeft={"5%"}
            marginRight={"5%"}
        >
            <GridItem rowSpan={2} colSpan={1}>
                <Button onClick={() => {
                    window.location.href = '#';
                }} colorScheme="blue" style={{width: "100%", height: "100%"}}>Home</Button>
            </GridItem>
            <GridItem colSpan={2}>
                <Button onClick={() => {
                    window.location.href = '/scraper';
                }} colorScheme="blue" style={{width: "100%", height: "100%"}}>Scraper</Button>
            </GridItem>
            <GridItem colSpan={2}>
                <Button onClick={() => {
                    window.location.href = '/dashboard';
                }} colorScheme="blue" style={{width: "100%", height: "100%"}}>Dashboard</Button>
            </GridItem>
            <GridItem colSpan={4}>
                <Button onClick={() => {
                    window.location.href = '/portfolio';
                }} colorScheme="blue" style={{width: "100%", height: "100%"}}>Portfolio</Button>
            </GridItem>
        </Grid>
    );
};

export default Home;