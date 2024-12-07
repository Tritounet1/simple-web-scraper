import { useEffect, useState } from "react"
import { Table } from "@chakra-ui/react"
import { Stack } from "@chakra-ui/react"

const Dashboard = () => {

    const[requests, setRequests] = useState([])

    const backendUrl = import.meta.env.VITE_APP_BACKEND_URL || "http://localhost:5000";

    const getRequests = async () => {
        try {
            const response = await fetch(`${backendUrl}/api/requests`, {
              method: "GET",
              mode: "cors",
            });
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setRequests(data)
          } catch (error) {
            console.error("An error occurred while downloading the file:", error);
          }
    }

    useEffect(() => {
        getRequests()
    }, [])

    return (
        <Stack paddingLeft={"8%"} marginRight={"8%"}>
            <Table.Root size="sm">
            <Table.Header>
                <Table.Row>
                <Table.ColumnHeader>Created At</Table.ColumnHeader>
                <Table.ColumnHeader>Url</Table.ColumnHeader>
                <Table.ColumnHeader>Scraper Name</Table.ColumnHeader>
                <Table.ColumnHeader>Status Code</Table.ColumnHeader>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {requests.map((request: any) => {
                const created_at = new Date(request.created_at).toLocaleString();
                const url = request.url; // .slice(0, 50) + "...";
                return (
                    <Table.Row key={request.id}>
                    <Table.Cell>{created_at}</Table.Cell>
                    <Table.Cell>{url}</Table.Cell>
                    <Table.Cell>{request.scraper_name}</Table.Cell>
                    <Table.Cell>{request.status_code}</Table.Cell>
                    </Table.Row>
                );
                })}
            </Table.Body>
            </Table.Root>
        </Stack>
      )
};

export default Dashboard;