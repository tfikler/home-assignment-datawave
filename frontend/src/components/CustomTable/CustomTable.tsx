//styles
import './CustomTable.css';

//react
import {Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell} from '@mui/material';
import {useState} from "react";
import EditDialog from "../EditDialog/EditDialog.tsx";
import {deleteRow} from "../../slices/countries-slice.ts";
import {useDispatch} from "react-redux";

export default function CustomTable({rows} : {rows: any[]}) {
    const dispatch = useDispatch();

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [rowActionIndex, setRowActionIndex] = useState(0);





    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
            id: 'population',
            label: 'Population',
            minWidth: 150,
            align: 'center',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 150,
            align: 'center',
            format: (value: number) => value.toLocaleString('en-US'),
        }
    ];
    return (
        <Paper className="paper">
            <TableContainer className="table-container">
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                            <TableCell key={"actions"} style={{ minWidth: 170, textAlign: "center"}}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => {
                                return (
                                    <TableRow tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value: any = row[column.id];
                                            return (
                                                <TableCell key={column.id}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell key={"actions"} className="actions">
                                            <button className="edit-button"
                                                    onClick={()=>{
                                                        setIsEditDialogOpen(true);
                                                        setRowActionIndex(index)
                                                    }}>
                                                Edit</button>
                                            <button className="delete-button"
                                                onClick={()=>{
                                                    dispatch(deleteRow({row_index: index}));
                                                }}
                                            >Delete</button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            {<EditDialog open={isEditDialogOpen}
                         handleClose={()=>{setIsEditDialogOpen(false)}}
                         row_index={rowActionIndex}
            />}
        </Paper>
    );
}
