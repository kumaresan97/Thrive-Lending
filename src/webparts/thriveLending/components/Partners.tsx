import * as React from "react";
import { useEffect, useState } from "react";
import SPServices from "../../config/SPServices";
import { Ipartners } from "../../config/config";
import { DefaultButton, Modal, PrimaryButton } from "office-ui-fabric-react";
import "./Style.scss";
import styles from "./ThriveLending.module.scss";

const ListName = "Partners";

const Partners = (props) => {
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
            Title: val.Title,
            Description: val.Description,
            URL: val.URL,
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
          <p style={{ fontSize: "18px", margin: "10px 0px" }}>
            <b>Partners</b>
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
                    }}
                    onClick={() => {
                      setIsopen(true);
                      (selectedItems.Title = val.Image[0].serverRelativeUrl),
                        (selectedItems.Url = val.URL)(
                          (selectedItems.Description = val.Description)
                        );
                      setSelectedItems({ ...selectedItems });
                    }}
                  >
                    <div
                      style={{
                        width: "175px",
                        height: "80px",
                        padding: "10px",
                        backgroundColor: "#efd9a5",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={val.Image[0]?.serverRelativeUrl}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </div>
                    <p
                      style={{
                        margin: "5px 0px 0px 0px",
                        color: "#666155",
                        fontWeight: 600,
                        fontSize: "18px",
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

        {/* Modal */}
        <Modal
          isOpen={isopen}
          styles={{
            main: {
              width: "40%",
              borderRadius: "5px",
              padding: "16px 24px",
            },
          }}
        >
          <div style={{ width: "120px", marginBottom: 14 }}>
            <img
              src={selectedItems.Title}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ maxHeight: 192, overflowY: "auto" }}>
            <p
              style={{
                margin: 0,
                lineHeight: "22px",
                color: "#000000",
                fontSize: "17px",
                fontWeight: 450,
              }}
            >
              {selectedItems.Description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <DefaultButton
              text="Cancel"
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
                setIsopen(false);
              }}
            />
            <PrimaryButton
              text="Open"
              iconProps={{ iconName: "OpenInNewWindow" }}
              styles={{
                root: {
                  background: "#D29602",
                  border: "none",
                  borderRadius: "4px",
                },
                rootHovered: {
                  border: "none",
                  background: "#D29602",
                },
                flexContainer: {
                  flexDirection: "row-reverse",
                },
              }}
              onClick={() => {
                if (selectedItems.Url) {
                  window.open(selectedItems.Url, "_blank");
                }
              }}
            />
          </div>
        </Modal>
        {/* Modal */}
      </div>
    </>
  );
};

export default Partners;
