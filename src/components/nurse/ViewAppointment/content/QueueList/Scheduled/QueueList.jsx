import { Box, Container, Divider, List, Typography } from "@mui/material";
import React, { Fragment } from "react";
import QueueRow from "../QueueRow";
import QueueListHeader from "./QueueListHeader";

const QueueList = ({ queues, onStatusChange, onViewReport }) => {
  const styles = {
    list: {
      width: "100%",
      bgcolor: "background.paper",
      borderRadius: 10,
      display: "flex",
      flexDirection: "column",
      height: "20rem",
      overflowY: "scroll",
      "&::-webkit-scrollbar": {
        width: "0.4em",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
      },
      padding: 2,
    },
    box: { textAlign: "center", m: 2 },
  };
  return (
    <>
      <List sx={styles.list} dense={true}>
        <QueueListHeader />
        <Divider variant="middle" />
        {queues?.length > 0 ? (
          queues?.map((queue) => (
            <Fragment key={queue.id}>
              <QueueRow
                queue={queue}
                onStatusChange={onStatusChange}
                onViewReport={onViewReport}
              />
              <Divider variant="middle" />
            </Fragment>
          ))
        ) : (
          <Box sx={styles.box}>
            <Typography variant="body1">No queues to show</Typography>
          </Box>
        )}
      </List>
    </>
  );
};

export default QueueList;
