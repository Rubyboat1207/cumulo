import { Button, Chip, IconButton, Paper, Typography } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { motion } from "framer-motion";
import InstallDesktopIcon from "@mui/icons-material/InstallDesktop";
import CloudIcon from "@mui/icons-material/Cloud";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

type ExtensionProps = {
  image: string;
  name: string;
  version: string;
  description: string;
  identifier: string;
  installedVersion?: string;
  isHorizontal?: boolean;
  reloadInstalled: () => void;
};

function Extension(props: ExtensionProps) {
  const horizontal = props.isHorizontal || false;
  const iconsx = {
    marginLeft: "5px !important",
    marginRight: "0px !important",
  };
  const isAlreadyInstalled = props.installedVersion ? true : false;
  const isDownloadable =
    (isAlreadyInstalled && props.installedVersion !== props.version) ||
    !isAlreadyInstalled;
  let description = props.description;

  function dl() {
    window.location.href = `cirrus://${props.identifier}`;

    setTimeout(() => {
      props.reloadInstalled();
    }, 5000);
  }

  if (horizontal) {
    const maxlength = 60;

    if(description.length > maxlength) {
      description = description.substring(0, maxlength - 3) + "..."
    }


    return (
      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
          damping: 10.0,
          stiffness: 120,
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
              width: "100%",
              height: 100,
              paddingLeft: 15 + "px",
              paddingRight: 15 + "px",
              transitionDuration: 0.2,
              boxShadow: "0px 0px 7px rgba(0,0,0,0.2)",
              transitionProperty: "transform, box-shadow",
              "&:hover": {
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
                transform: "scale(1.02)",
              },
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <img src={props.image} className="productimage horiz" />

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <Typography
                      variant={"h4"}
                      fontWeight={700}
                      color={"#022f40"}
                      sx={{ fontSize: "27px" }}
                    >
                      {props.name}
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        marginLeft: 10
                      }}
                    >
                      <Chip
                        icon={<CloudIcon sx={iconsx} />}
                        label={props.version}
                        color={"primary"}
                        size="small"
                      />
                      {props.installedVersion && (
                        <Chip
                          icon={<InstallDesktopIcon sx={iconsx} />}
                          label={props.installedVersion}
                          color={"success"}
                          variant="outlined"
                          sx={{ marginLeft: 1 }}
                          size="small"
                        />
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      marginLeft: 10
                    }}
                  >
                    <p style={{ margin: 0 }}>{description}</p>
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column'
                  }}
                >
                  <IconButton disabled={!isDownloadable} color="primary" sx={{aspectRatio: '1/1'}} onClick={dl}>
                    {isAlreadyInstalled && isDownloadable ? (
                      <>
                        <CloudDownloadIcon />
                      </>
                    ) : (
                      <>
                        <DownloadIcon />
                      </>
                    )}
                  </IconButton>
                </div>
              </div>
            </div>
          </Paper>
        </motion.div>
      </motion.div>
    );
  }

  const maxlength = 70;

  if(description.length > maxlength) {
    description = description.substring(0, maxlength - 3) + "..."
  }

  return (
    <motion.div
      initial={{ y: 50 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        damping: 10.0,
        stiffness: 120,
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
            paddingLeft: 15 + "px",
            paddingRight: 15 + "px",
            transitionDuration: 0.2,
            boxShadow: "0px 0px 7px rgba(0,0,0,0.2)",
            transitionProperty: "transform, box-shadow",
            "&:hover": {
              boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
              transform: "scale(1.02)",
            },
          }}
        >
          <div>
            <img src={props.image} className="productimage" />
            <Typography
              variant={"h4"}
              fontWeight={700}
              color={"#022f40"}
              sx={{ marginBottom: 1, fontSize: "27px" }}
            >
              {props.name}
            </Typography>
            <div>
              <Chip
                icon={<CloudIcon sx={iconsx} />}
                label={props.version}
                color={"primary"}
                size="small"
              />
              {props.installedVersion && (
                <Chip
                  icon={<InstallDesktopIcon sx={iconsx} />}
                  label={props.installedVersion}
                  color={"success"}
                  variant="outlined"
                  sx={{ marginLeft: 1 }}
                  size="small"
                />
              )}
            </div>
            <br />
            <p style={{ margin: 0 }}>{description}</p>
            <Button
              disabled={!isDownloadable}
              variant="contained"
              sx={{ marginTop: 4 }}
              onClick={dl}
            >
              {isAlreadyInstalled && isDownloadable ? (
                <>
                  <span>Update</span>
                  <CloudDownloadIcon sx={{ marginLeft: 1 }} />
                </>
              ) : (
                <>
                  <span>Download</span>
                  <DownloadIcon />
                </>
              )}
            </Button>
          </div>
        </Paper>
      </motion.div>
    </motion.div>
  );
}

export default Extension;
