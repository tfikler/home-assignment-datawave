import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import {updateCountry} from "../../slices/countries-slice.ts";
import {useDispatch, useSelector} from "react-redux";

interface EditDialogProps {
    open: boolean;
    handleClose: () => void;
    countryId: number;  // Changed from row_index to countryId
}

export default function EditDialog({open, handleClose, countryId}: EditDialogProps) {
    const dispatch = useDispatch();
    const rows = useSelector((state: any) => state.table.rows || []);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        description: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const country = rows.data.find((row: any) => row.id === countryId);
        if (country) {
            setFormData({
                name: country.name || '',
                code: country.code || '',
                description: country.description || '',
            });
        }
    }, [countryId, rows]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.code.trim()) {
            newErrors.code = 'Code is required';
        } else if (formData.code.length !== 2) {
            newErrors.code = 'Code must be 2 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log(id, value);
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
        // Clear error when field is modified
        if (errors[id]) {
            setErrors(prev => ({
                ...prev,
                [id]: ''
            }));
        }
    };

    const handleSave = () => {
        if (validateForm()) {
            const payload = {
                ...formData,
            };
            dispatch(updateCountry({ id: countryId, data: payload }));
            handleClose();
        }
    };

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
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    margin="dense"
                    id="code"
                    label="Code"
                    type="text"
                    fullWidth
                    value={formData.code}
                    onChange={handleChange}
                    error={!!errors.code}
                    helperText={errors.code}
                    inputProps={{ maxLength: 2 }}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    fullWidth
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors.population}
                    helperText={errors.population}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}