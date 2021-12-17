import React from "react";
import { useState, useEffect } from "react";
const Test = () => {
  useEffect(() => {
    postData(person);
  }, []);

  let person = {
    firstName: "HALooo",
    lastName: "Kowalski",
    email: "inny@o2.pl",
    password: "haslo",
  };

  function postData() {
    fetch("http://localhost:8080/api/v1/registration", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: "Aaaann",
        lastName: "Kowalski",
        email: "adsfdsafsd@o2.pl",
        password: "haslo",
      }),
    });
  }

  return <div>aaa</div>;
};

export default Test;
