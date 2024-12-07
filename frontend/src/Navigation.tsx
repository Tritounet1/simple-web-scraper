import { Stack } from "@chakra-ui/react"
import { Button } from "./components/ui/button"
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTrigger,
} from "./components/ui/drawer"
import { FiAlignJustify } from "react-icons/fi";

const Navigation = () => {
    return (
        <DrawerRoot key={"start"} placement={"start"}>
            <DrawerBackdrop />
            <DrawerTrigger asChild>
            <Button margin={"25px"} variant="outline" size="sm">
                <FiAlignJustify />
            </Button>
            </DrawerTrigger>
            <DrawerContent>
            <DrawerHeader>
            </DrawerHeader>
            <DrawerBody>
                <Stack padding={"5%"} gap="8">
                    <a href="/home">Home</a>
                    <a href="/scraper">Scraper</a>
                    <a href="/dashboard">Dashboard</a>
                    <a href="/portfolio">Portfolio</a>
                    <a href={"#"} onClick={() => {
                        localStorage.removeItem('authenticated');
                        window.location.href = '/';
                    }}>Logout</a>
                </Stack>
            </DrawerBody>
                <DrawerFooter>
                </DrawerFooter>
            <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default Navigation;