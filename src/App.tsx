import React, { Fragment, useEffect, useState } from "react";
import { IForm } from "./IFormAction";
import { formAction } from "./Services";

function App() {  

  const [formHtml, setFormHtml] = useState<any[]>([]);
  const [htmlArr, setHtmlArr] = useState<[]>([]);
  const [changes, setChanges] = useState<any>({});

  useEffect(() => {
    formAction().then((res) => {
      const form: IForm = res.data;
      const datas =
        form.forms[0].bilgiler.formjson.children[0].children[0].children[0]
          .children;
      setFormHtml(datas);
    });
    let arr: any = [];

    formHtml.map((item: any, index: any) => {      
      arr.push(item);
      if (item.tag !== "legend") {
        item.children.map((item: any, index: any) => {
          arr.push(item);
          if (item.tag === "div") {
            item.children.map((item: any, index: any) => {
              arr.push(item);
              if (item.tag === "label" || item.tag === "select") {
                item.children.map((item: any, index: any) => {
                  arr.push(item);
                });
              }
              setHtmlArr(arr);
            });
          }
        });
      }
    });
  }, [formHtml]);
  //console.log("htmlArr :>> ", htmlArr);

  

  function fncOnChange(e: any) {
    console.log("e.target.value :>> ", e.target.value, e.target.name);
    setChanges({
      ...changes,
      [e.target.name]: e.target.value,
    });
  }

  function fncSubmit(e: any) {
    e.preventDefault();
    console.log(changes);
  }

  return (
    <>
      <form onSubmit={(e) => fncSubmit(e)}>
        {htmlArr &&
          htmlArr.map((item: any, index: any) => {
            if (item.tag === "select") {
              return (
                <Fragment key={index}>
                  {React.createElement(
                    item.tag,
                    {
                      className: item.class,
                      name: item.name,
                      type: item.type,
                      placeholder: item.placeholder,
                      htmlFor: item.for,
                      onChange: fncOnChange,
                     
                    },
                    item.children.map((item: any, index: any) => {
                      return React.createElement(
                        item.tag,
                        {
                          html: item.html,
                          onChange: fncOnChange,
                          name: item.name,
                          key: index
                        },
                        item.html
                      );
                    })
                  )}
                </Fragment>
              );
            } else {
              if (item.tag !== "option") {
                return React.createElement(
                  item.tag,
                  {
                    className: item.class,
                    name: item.name,
                    type: item.type,
                    placeholder: item.placeholder,
                    htmlFor: item.for,
                    value: item.value,
                    key: index,
                    onChange: fncOnChange,
                  },
                  item.html
                );
              }
            }
          })}
      </form>
    </>
  );
}

export default App;
