import './CustomTable.css';
import { Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell, Pagination } from '@mui/material';
// import { useState } from "react";
import EditDialog from "../EditDialog/EditDialog";
import { deleteCountry, fetchRows } from "../../slices/countries-slice";
import { useDispatch } from "react-redux";
import { Country } from '../../types/country.interface';
import {useState} from "react";

interface CustomTableProps {
    rows: Country[];
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function CustomTable({ rows, page, totalPages, onPageChange }: CustomTableProps) {
    const dispatch = useDispatch();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

    const columns = [
        { id: 'name', label: 'Name', minWidth: 150 },
        { id: 'code', label: 'Code', minWidth: 100 },
        { id: 'flag', label: 'Flag', minWidth: 100 },
    ];

    const handleDelete = async (id: number) => {
        await dispatch(deleteCountry(id) as any);
        dispatch(fetchRows({ page, limit: 5 }) as any);
    };

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
                            <TableCell style={{ minWidth: 170, textAlign: "center"}}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow hover tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                    const value = row[column.id as keyof Country];
                                    let string_value = value as string;
                                    return (
                                        <TableCell key={column.id}>
                                            {column.id === 'flag' ? (
                                                <img
                                                    src={string_value}
                                                    alt="flag"
                                                    className="flag"
                                                    style={{ width: 30, height: 20 }}
                                                />
                                            ) : (
                                                string_value
                                            )}
                                        </TableCell>
                                    );
                                })}
                                <TableCell className="actions">
                                    <button
                                        className="edit-button"
                                        onClick={() => {
                                            setSelectedCountry(row);  // Pass the entire row/country object
                                            setIsEditDialogOpen(true);
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Delete
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, newPage) => onPageChange(newPage)}
                className="pagination"
            />
            {isEditDialogOpen && selectedCountry && (
                <EditDialog
                    open={isEditDialogOpen}
                    handleClose={() => {
                        setIsEditDialogOpen(false);
                        setSelectedCountry(null);
                    }}
                    countryId={selectedCountry.id}
                />
            )}
        </Paper>
    );
}