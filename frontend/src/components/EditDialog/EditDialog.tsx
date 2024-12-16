import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {editRow} from "../../slices/countries-slice.ts";
import {useDispatch, useSelector} from "react-redux";


export default function EditDialog({open, handleClose, row_index} : {open: boolean, handleClose: () => void, row_index: number}) {
    const dispatch = useDispatch();
    const rows = useSelector((state: any) => state.table.rows);
    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [population, setPopulation] = useState('');
    const [size, setSize] = useState('');
    const [density, setDensity] = useState('');

    useEffect(() => {
        // Ensure row_index is valid before accessing rows[row_index]
        if (rows[row_index]) {
            const row = rows[row_index];
            setName(row.name || '');
            setCode(row.code || '');
            setPopulation(row.population || 0);
            setSize(row.size || 0);
            setDensity(row.density || 0);
        }
    }, [row_index, rows]);


    const handleSave = () => {
        dispatch(editRow({name, code, population, size, density, row_index}));
        handleClose();
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Country</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="code"
                    label="Code"
                    type="text"
                    fullWidth
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="population"
                    label="Population"
                    type="number"
                    fullWidth
                    value={population}
                    onChange={(e) => setPopulation(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="size"
                    label="Size"
                    type="number"
                    fullWidth
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="density"
                    label="Density"
                    type="number"
                    fullWidth
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}