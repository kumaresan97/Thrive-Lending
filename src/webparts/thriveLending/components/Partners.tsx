import * as React from "react";
import { useEffect, useState, useRef } from "react";
import SPServices from "../../config/SPServices";
import { Ipartners } from "../../config/config";
import { DefaultButton, Modal, PrimaryButton } from "office-ui-fabric-react";
import "./Style.scss";
import styles from "./ThriveLending.module.scss";

const ListName = "Partners";

const Partners = (props) => {
  const inputRef = useRef(null);
  const [Data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    Title: "",
    Description: "",
    Url: "",
  });
  const [isopen, setIsopen] = useState(false);

  const fetchData = async () => {
    SPServices.SPReadItems({
      Listname: ListName,
      Select: "*,AttachmentFiles",
      Expand: "AttachmentFiles",
      Orderby: "Created",
      Orderbydecorasc: false,
    })
      .then((items) => {
        let Datas: Ipartners[] = [];
        items.forEach((val: any) => {
          let arrGetAttach = [];
          val.AttachmentFiles.forEach((data: any) => {
            arrGetAttach.push({
              fileName: data.FileName,
              serverRelativeUrl: data.ServerRelativeUrl,
            });
          });
          Datas.push({
            Title: val?.Title,
            Description: val?.Description,
            URL: val?.URL,
            Image: arrGetAttach,
          });
        });
        setData([...Datas]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className={styles.Overall}>
        <div>
          <p style={{ fontSize: "18px", margin: "14px 0px", fontWeight: 500 }}>
            Partners
          </p>
        </div>

        <div className={styles.Container}>
          {Data.length > 0 ? (
            Data.map((val) => {
              return (
                <div className={styles.Box}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      flexDirection: "column",
                      textAlign: "center",
                      cursor: "pointer",
                      border: "1px solid black",
                      borderRadius: "8px",
                    }}
                    onClick={() => {
                      setIsopen(true);
                      selectedItems.Title = val.Image[0].serverRelativeUrl;
                      selectedItems.Url = val.URL;
                      selectedItems.Description = val.Description;
                      setSelectedItems({ ...selectedItems });
                    }}
                  >
                    <div
                      style={{
                        width: "175px",
                        height: "80px",
                        padding: "10px",
                       
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={
                          val.Image.length ? val.Image[0].serverRelativeUrl : ""
                        }
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <p
                      style={{
                        margin: "5px 0px 0px 0px",
                        color: "#666155",
                      }}
                    >
                      {val.Title}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "30vh",
                width: "100%",
              }}
            >
              <label style={{ fontSize: "20px", fontWeight: 600 }}>
                No Data Found!!!
              </label>
            </div>
          )}
        </div>

       
        <Modal
          isOpen={isopen}
          onDismiss={() => {
            selectedItems.Description = "";
            selectedItems.Title = "";
            selectedItems.Url = "";
            setSelectedItems({ ...selectedItems });
            setIsopen(false);
          }}
          styles={{
            main: {
              width: "75%",
              borderRadius: "5px",
              padding: "16px 24px",
              height: "75vh",
              position: "relative",
            },
          }}
        >
          <div style={{ width: "120px", marginBottom: 14, display: "flex" }}>
            <img
              src={selectedItems.Title}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <input
              ref={inputRef}
              type="text"
              style={{ visibility: "hidden" }}
            ></input>
          </div>

          <div
            className={`${styles.modalboxP}`}
            id="modalboxP"
            // style={{ maxHeight: 400, overflowY: "auto" }}
          >
            {/* <p
              style={{
                margin: 0,
                lineHeight: "22px",
                color: "#000000",
                 fontSize: "15px",
                 textAlign:"justify"
                // fontWeight: 450,
                // fontFamily:"sans-serif"
              }}
            >
              {selectedItems.Description}
            </p> */}
            <div
              dangerouslySetInnerHTML={{ __html: selectedItems.Description }}
            />
          </div>

          <div className={styles.btnSection}
            // style={{
            //   display: "flex",
            //   justifyContent: "end",
            //   gap: "10px",
            //   position: "absolute",
            //   bottom: "15px",
            //   right: "20px",
            // }}
          >
            <DefaultButton
              text="Close"
              styles={{
                root: {
                  background: "#8E8E8E",
                  borderRadius: "4px",
                  color: "#FDFEFE ",
                },
                rootHovered: {
                  background: "#8E8E8E",
                  color: "#FDFEFE",
                  borderColor: "#8E8E8E",
                },
              }}
              onClick={() => {
                selectedItems.Description = "";
                selectedItems.Title = "";
                selectedItems.Url = "";
                setSelectedItems({ ...selectedItems });
                setIsopen(false);
              }}
            />
            <PrimaryButton
              text="Open"
              iconProps={{ iconName: "OpenInNewWindow" }}
              styles={{
                root: {
                  background: "rgb(44, 104, 254)",
                  border: "none",
                  borderRadius: "4px",
                  ":active": {
                    background: "rgb(180, 201, 253 ) !important",
                    border: "1px solid  rgb(210 150 2 / 44%)  !important",
                    color: "#8E8E8E !important",
                  },
                },
                rootHovered: {
                  border: "none",
                  background: "rgb(44, 104, 254)",
                },
                flexContainer: {
                  flexDirection: "row-reverse",
                },
              }}
              onClick={() => {
                if (selectedItems.Url) {
                  console.log(selectedItems.Url);
                  window.open(selectedItems.Url, "_blank");
                }
              }}
            />
          </div>
        </Modal>
     
      </div>
    </>
  );
};

export default Partners;
