import './TopBoxCss.css'
import { Avatar } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RSC from "react-scrollbars-custom";

export default function TopBox({ com }) {

    const columns = [
        {
            id: 'profile',
            label: "Profile",
            minWidth: 20,
        },
        {
            id: 'Name',
            label: 'Name',
            minWidth: 20
        },
        {
            id: 'BranchName',
            label: 'Branch',
            minWidth: 20
        },
        {
            id: 'Profit',
            label: 'Profit',
            minWidth: 20
        }
    ]
    return (
        <div className='topContainer'>
            <div className='topTitle'>
                <div className='titleBox'>Top Branch</div>
            </div>
            <div className='topContent'>

                <div className='topBranch'>
                    <div style={{overflow : 'hidden'}}>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        <TableContainer sx={{ maxHeight: 210 }}>
                            <Table stickyHeader aria-label='sticky table'>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow hover role='checkbox'>
                                        <TableCell>
                                            <Avatar><PersonIcon /></Avatar>
                                        </TableCell>
                                        <TableCell>
                                            김철수
                                        </TableCell>
                                        <TableCell>
                                            마포구 1호점
                                        </TableCell>
                                        <TableCell>
                                            2,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover role='checkbox'>
                                        <TableCell>
                                            <Avatar><PersonIcon /></Avatar>
                                        </TableCell>
                                        <TableCell>
                                            김철수
                                        </TableCell>
                                        <TableCell>
                                            마포구 2호점
                                        </TableCell>
                                        <TableCell>
                                            2,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover role='checkbox'>
                                        <TableCell>
                                            <Avatar><PersonIcon /></Avatar>
                                        </TableCell>
                                        <TableCell>
                                            김철수
                                        </TableCell>
                                        <TableCell>
                                            마포구 3호점
                                        </TableCell>
                                        <TableCell>
                                            2,000,000
                                        </TableCell>
                                    </TableRow>
                                    <TableRow hover role='checkbox'>
                                        <TableCell>
                                            <Avatar><PersonIcon /></Avatar>
                                        </TableCell>
                                        <TableCell>
                                            김철수
                                        </TableCell>
                                        <TableCell>
                                            마포구 4호점
                                        </TableCell>
                                        <TableCell>
                                            2,000,000
                                        </TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                    </div>
                    

                </div>

            </div>
        </div>
    )
}