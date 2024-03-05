import * as React from "react";
import { useState, useEffect,useRef } from "react";
import SPServices from "../../config/SPServices";
import { ILoanproducts } from "../../config/config";
import styles from "./LoanProducts.module.scss";
import "./style.css";
import {
  DefaultButton,
  Dialog,
  Label,
  Modal,
  PrimaryButton,
} from "@fluentui/react";
let ListName = "LoanProducts";
const MainComponent = (props: any): JSX.Element => {
  const inputRef = useRef(null);
  const [loanProducts, setLoanProducts] = useState({
    Standard: [],
    nonStandard: [],
  });
  const [selectedItems, setSelectedItems] = useState({
    Title: "",
    Description: "",
    Url: "",
  });
  const [isopen, setIsopen] = useState(false);

  const getLoanproducts = () => {
    SPServices.SPReadItems({
      Listname: ListName,
      Select: "*,AttachmentFiles",
      Expand: "AttachmentFiles",
      Orderby: "sequence",
      Orderbydecorasc: true,
    })
      .then((res: any) => {
        let standarddatas: ILoanproducts[] = [];
        let nonstandarddatas: ILoanproducts[] = [];
        res.forEach((val: any) => {
          let arrGetAttach = [];
          val.AttachmentFiles.forEach((data: any) => {
            arrGetAttach.push({
              fileName: data.FileName,
              serverRelativeUrl: data.ServerRelativeUrl,
            });
          });
          if (val.LoanTypes == "Standard Loan Products") {
            standarddatas.push({
              Title: val?.Title,
              Description: val?.Description,
              URL: val?.URL,
              Image: arrGetAttach,
              sequence:val?.sequence,
              LoanTtype: val.LoanTypes,
            });
          } else {
            nonstandarddatas.push({
              Title: val?.Title,
              Description: val?.Description,
              URL: val?.URL,
              Image: arrGetAttach,
              LoanTtype: val?.LoanTypes,
              sequence:val?.sequence,
            });
          }
        });

        setLoanProducts({
          ...loanProducts,
          Standard: standarddatas,
          nonStandard: nonstandarddatas,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getLoanproducts();
  }, []);

  return (
    <>
      <div className={styles.mainSection}>

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
          <div style={{ width: "500px", marginBottom: 14, display:"flex" }}>
          <h2 className={styles.modelh4}>
            {selectedItems.Title}
          </h2>
          <input ref={inputRef} type="text" style={{visibility:"hidden"}} ></input>
          </div>
          <div
            className={styles.modalboxP}
          >
            <div
            className={styles.content}
              dangerouslySetInnerHTML={{ __html: selectedItems.Description }}
            />
            {/* </p> */}
          </div>

          <div
          className={styles.btnSection}
          >
            <DefaultButton
              text="Close"
              styles={{
                root: {
                  background: "#8E8E8E",
                  borderRadius: "4px",
                  color: "#FFFFFF",
                  fontSize: "15px",
                  fontWeight: 400,
                },
                rootHovered: {
                  color: "#FFFFFF",
                  background: "#8E8E8E",
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
         
          </div>
        </Modal>

        <h5 style={{ fontSize: "18px", margin: "14px 0px", fontWeight: 500 }}>
          Standard Loan Products
        </h5>
        <div
          className={styles.Container}
          //   style={{
          //     display: "flex",
          //     flexWrap: "wrap",
          //     justifyContent: "space-evenly",
          //     alignItems: "center",
          //   }}
        >
          {loanProducts.Standard.length > 0 ? (
            loanProducts.Standard.map((val) => {
              return (
                <div
                  className={styles.Box}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "100%",
                      //   padding: 20,
                      flexDirection: "column",
                      textAlign: "center",
                      cursor: "pointer",
                      borderRadius: "8px",
                      border: "1px solid black",
                    }}
                    onClick={() => {
                      setIsopen(true);
                      (selectedItems.Title = val.Title),
                        (selectedItems.Description = val.Description);
                      selectedItems.Url = val.URL;
                      setSelectedItems({ ...selectedItems });
                    }}
                  >
                    <div
                      style={{
                        width: "54px",
                        height: "54px",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                        borderRadius: "5px",
                      }}
                    >
                      <img
                        src={
                          val.Image.length ? val.Image[0].serverRelativeUrl : ""
                        }
                        style={{
                          width: "40px",
                          height: "40px",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "cover",
                        }}
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
              <Label>No Data Found!!!</Label>
            </div>
          )}
        </div>
        {/* nonstandard */}

        <div>
          <h5 style={{ fontSize: "18px", margin: "14px 0px", fontWeight: 500 }}>
            Non-Standard Loan Products
          </h5>
          <div
            className={styles.Container}
            // style={{
            //   display: "flex",
            //   flexWrap: "wrap",
            //   //   justifyContent: "space-evenly",
            //   alignItems: "center",
            // }}
          >
            {loanProducts.nonStandard.length > 0 ? (
              loanProducts.nonStandard.map((val) => {
                return (
                  <div
                    className={styles.Box}
                    // style={{
                    //   width: "23%",
                    //   background: "#D29602",
                    //   height: "180px",

                    //   margin: "0  10px 10px",
                    // }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                        // padding: 20,
                        flexDirection: "column",
                        textAlign: "center",
                        cursor: "pointer",
                        borderRadius: "8px",
                        border: "1px solid black",
                      }}
                      onClick={() => {
                        setIsopen(true);
                        (selectedItems.Title = val.Title),
                          (selectedItems.Url = val.URL)(
                            (selectedItems.Description = val.Description)
                          );
                        setSelectedItems({ ...selectedItems });
                      }}
                    >
                      <div
                        style={{
                          width: "54px",
                          height: "54px",
                          padding: "10px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "transparent",
                        
                          borderRadius: "5px",
                        }}
                      >
                        <img
                          src={
                            val.Image.length
                              ? val.Image[0].serverRelativeUrl
                              : ""
                          }
                          style={{
                            width: "40px",
                            height: "40px",
                            maxWidth: "100%",
                            maxHeight: "100%",
                         
                            objectFit: "cover",
                          }}
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
                <Label>No Data Found!!!</Label>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default MainComponent;
