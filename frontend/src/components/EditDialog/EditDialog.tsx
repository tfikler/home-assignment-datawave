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
        population: '',
        size: '',
        density: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const country = rows.data.find((row: any) => row.id === countryId);
        if (country) {
            setFormData({
                name: country.name || '',
                code: country.code || '',
                population: country.population?.toString() || '',
                size: country.size?.toString() || '',
                density: country.density?.toString() || ''
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

        if (formData.population && Number(formData.population) < 0) {
            newErrors.population = 'Population cannot be negative';
        }

        if (formData.size && Number(formData.size) < 0) {
            newErrors.size = 'Size cannot be negative';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
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
                population: formData.population ? Number(formData.population) : undefined,
                size: formData.size ? Number(formData.size) : undefined,
                density: formData.density ? Number(formData.density) : undefined,
            };
            console.log('Save', payload);
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
                    id="population"
                    label="Population"
                    type="number"
                    fullWidth
                    value={formData.population}
                    onChange={handleChange}
                    error={!!errors.population}
                    helperText={errors.population}
                />
                <TextField
                    margin="dense"
                    id="size"
                    label="Size"
                    type="number"
                    fullWidth
                    value={formData.size}
                    onChange={handleChange}
                    error={!!errors.size}
                    helperText={errors.size}
                />
                <TextField
                    margin="dense"
                    id="density"
                    label="Density"
                    type="number"
                    fullWidth
                    value={formData.density}
                    onChange={handleChange}
                    error={!!errors.density}
                    helperText={errors.density}
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