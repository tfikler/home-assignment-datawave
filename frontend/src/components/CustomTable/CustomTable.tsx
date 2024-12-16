//styles
import './CustomTable.css';

//react
import {Table, Paper, TableBody, TableContainer, TableHead, TableRow, TableCell} from '@mui/material';

export default function CustomTable() {
    // const [rows, setRows] = useState([]);

    // useEffect(() => {
    //     fetch('https://restcountries.com/v3.1/all')
    //         .then(response => response.json())
    //         .then(data => {
    //             setRows(data);
    //         });
    // }, []);
    const rows = [
        { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 403 },
        { name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 147 },
        { name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 201 },
        { name: 'United States', code: 'US', population: 331449281, size: 9833520, density: 34 },
        { name: 'Canada', code: 'CA', population: 38520851, size: 9976140, density: 4 },
        { name: 'Australia', code: 'AU', population: 25268912, size: 7692024, density: 3 },

    ]

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
        {
            id: 'population',
            label: 'Population',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'size',
            label: 'Size\u00a0(km\u00b2)',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        {
            id: 'density',
            label: 'Density',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toFixed(2),
        },
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => {
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
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
