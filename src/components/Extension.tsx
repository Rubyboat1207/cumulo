import { Button, Chip, Paper, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from "framer-motion";
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import CloudIcon from '@mui/icons-material/Cloud';

type ExtensionProps = {
    image: string,
    name: string,
    version: string, 
    description: string,
    identifier: string,
    installedVersion?: string
}

function Extension(props: ExtensionProps) {
    
    const iconsx = {marginLeft: '5px !important', marginRight: '0px !important'};

    return (
        <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            transition={{
                duration: 0.5,
                type: 'spring',
                damping: 10.0,
                stiffness: 120
            }}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.3,
                }}
            >
                <Paper
                sx={{
                    width: 270,
                    height: 430, 
                    paddingLeft: 15 + 'px', 
                    paddingRight: 15 + 'px',
                    transitionDuration: 0.2,
                    boxShadow: '0px 0px 7px rgba(0,0,0,0.2)',
                    transitionProperty: 'transform, box-shadow',
                    '&:hover': {
                        boxShadow: '0px 0px 20px rgba(0,0,0,0.2)',
                        transform: 'scale(1.02)'
                    }
                }}
                >
                    <div>
                        <img src={props.image} className='productimage'/>
                        <Typography variant={'h4'} fontFamily={'K2D'} fontWeight={700} color={'#022f40'} sx={{marginBottom:1}}>{props.name}</Typography>
                        <div>
                            <Chip icon={<CloudIcon sx={iconsx}/>} label={props.version} color={"primary"} size="small"/>
                            { props.installedVersion &&
                                <Chip icon={<InstallDesktopIcon sx={iconsx} />} label={props.installedVersion} color={"success"} variant="outlined" sx={{marginLeft:1}} size="small"/>
                            }
                        </div>
                        <br/>
                        <p style={{margin: 0}}>{props.description}</p>
                        <Button disabled={(props.installedVersion && props.installedVersion === props.version) ? true : false} variant="contained" sx={{marginTop: 4}} onClick={() => window.location.href = `cirrus://${props.identifier}`}>Download<DownloadIcon/></Button>
                    </div>
                </Paper>
            </motion.div>
        </motion.div>
    )
}

export default Extension;