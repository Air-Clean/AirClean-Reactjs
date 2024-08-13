import './TopBoxCss.css';
import { Avatar } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRanking } from '../../../apis/MainAPICalls';

export default function TopBox({ com }) {

  const dispatch = useDispatch();

  const columns = [
    { id: 'rank', label: 'Rank', minWidth: 20 },
    { id: 'profile', label: 'Profile', minWidth: 20 },
    { id: 'Name', label: 'Name', minWidth: 20 },
    { id: 'BranchName', label: 'Branch', minWidth: 20 },
    { id: 'Profit', label: 'Profit', minWidth: 20 },
  ];

  useEffect(() => {
    dispatch(getRanking());
  }, [dispatch,com]);

  useEffect(()=>{
    dispatch(getRanking())
  },[])

  const result = useSelector(state => state.rankingReducer);

  console.log('Ranking Result:', result);

  return (
    <div className="topContainer">
      <div className="topTitle">
        <div className="titleBox">Top Branch</div>
      </div>
      <div className="topContent">
        <div className="topBranch">
          <div style={{ overflow: 'hidden' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 250 }}>
                <Table stickyHeader aria-label="sticky table">
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
                    {result?.map((member, index) => (
                      <TableRow hover role="checkbox" key={index}>
                        <TableCell>{member.rankIndex}</TableCell>
                        <TableCell>
                          <Avatar src={member.memberImage}>
                            <PersonIcon />
                          </Avatar>
                        </TableCell>
                        <TableCell>{member.memberName}</TableCell>
                        <TableCell>{member.branchName}</TableCell>
                        <TableCell>
                          {new Intl.NumberFormat('ko-KR', {
                            style: 'currency',
                            currency: 'KRW',
                          }).format(member.totalRevenue)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </div>
    </div>
  );
}
