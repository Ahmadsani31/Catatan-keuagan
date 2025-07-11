import { CATEGORYSTATUS } from '@/lib/utils';
import { Badge } from './ui/badge';

export default function CategoryStatusBadge({ status }: any) {
    const { INCOME, EXPENSE, DEBT } = CATEGORYSTATUS;

    let badge, text;

    switch (status) {
        case INCOME:
            badge = 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 border-green-500';
            text = INCOME;
            break;
        case EXPENSE:
            badge = 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 border-yellow-500';
            text = EXPENSE;
            break;
        case DEBT:
            badge = 'text-white bg-gradient-to-r from-red-400 via-red-500 to-red-500 border-red-500';
            text = DEBT;
            break;
        default:
            badge = '';
            text = '-';
            break;
    }

    return <Badge className={badge}>{text}</Badge>;
}
