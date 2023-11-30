import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import TimerIcon from '@mui/icons-material/Timer';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import ForumIcon from '@mui/icons-material/Forum';
import SchoolIcon from '@mui/icons-material/School';
import AdbIcon from '@mui/icons-material/Adb';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import TuneIcon from '@mui/icons-material/Tune';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

export const ADDON_CATEGORIES: string[] = [
    "productivity",
    'time_tracking',
    'system_diagnostics',
    'social',
    'education',
    'ai',
    'information',
    'shopping_finance',
    'accessibility',
    'utility',
    'fun'
]

type mapType = {[key: string]: JSX.Element};

function iconFromCategory(category: string): JSX.Element | null {
    const map: mapType = {
        "productivity": <PrecisionManufacturingIcon/>,
        "time_tracking": <TimerIcon/>,
        "system_diagnostics": <TuneIcon/>,
        "social": <ForumIcon/>,
        "education": <SchoolIcon/>,
        "ai": <AdbIcon/>,
        "information": <LocalLibraryIcon/>,
        "shopping_finance": <AccountBalanceWalletIcon/>,
        "accessibility": <AccessibilityIcon/>,
        "utility": <BuildCircleIcon/>,
        "fun": <SportsEsportsIcon/>
    }

    return map[category] || null;
}


function CategoryIcon({category}: {category: string}) {
    return (
        <>
            {iconFromCategory(category)}
        </>
    )
}