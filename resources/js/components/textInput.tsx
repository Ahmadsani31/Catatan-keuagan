import { cn } from '@/lib/utils';
import { Input } from './ui/input';
type itemsProps = {
    title: string;
    value?: string;
    placeholder: string;
    type: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: string;
    required?: boolean;
};
export default function TextInput({ title, value, errors, placeholder, type, onChange, required }: itemsProps) {
    let autoComplete = '';
    switch (type) {
        case 'password':
            autoComplete = 'current-password';
            break;
        case 'email':
            autoComplete = 'email';
            break;
        default:
            autoComplete = '';
            break;
    }
    return (
        <div className="mb-3">
            <label htmlFor={title} className="mb-1 block text-sm">
                {title}
            </label>
            <Input
                id={title}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
                className={cn(errors ? 'border-red-500' : '')}
                required={required}
                autoFocus={true}
            />
            {errors && <p className="m-0 text-sm text-red-500">{errors}</p>}
        </div>
    );
}
