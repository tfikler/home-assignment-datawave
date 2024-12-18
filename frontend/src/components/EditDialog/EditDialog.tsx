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
        lat: '',
        lng: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        const country = rows.data.find((row: any) => row.id === countryId);
        if (country) {
            setFormData({
                name: country.name || '',
                code: country.code || '',
                description: country.description || '',
                lat: country.lat || '',
                lng: country.lng || '',
            });
        }
    }, [countryId, rows]);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
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
                <TextField
                    margin="dense"
                    id="lat"
                    label="Latitude"
                    fullWidth
                    value={formData.lat}
                    onChange={handleChange}
                    error={!!errors.population}
                    helperText={errors.population}
                />
                <TextField
                    margin="dense"
                    id="lng"
                    label="Longitude"
                    fullWidth
                    value={formData.lng}
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