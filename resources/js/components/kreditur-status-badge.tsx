import { KREDITURSTATUS } from '@/lib/utils';
import { Badge } from './ui/badge';

export default function KrediturStatusBadge({ status }: any) {
    const { TERHUTANG, LUNAS } = KREDITURSTATUS;

    let badge, text;

    switch (status) {
        case LUNAS:
            badge = 'text-white bg-gradient-to-r from-green-400 via-green-500 to-green-500 border-green-500';
            text = LUNAS;
            break;
        case TERHUTANG:
            badge = 'text-white bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 border-yellow-500';
            text = TERHUTANG;
            break;
        default:
            badge = '';
            text = '-';
            break;
    }

    return <Badge className={badge}>{text}</Badge>;
}
