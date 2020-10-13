import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import PingService from "../services/ping.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validateHost = (value) => {
  const isValidDomain = require("is-valid-domain");
  const isIp = require("is-ip");
  if (!isValidDomain(value) && !isIp(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid hostname!
      </div>
    );
  }
};

const PingTest = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [hostname, setHostname] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeHostname = (e) => {
    const hostname = e.target.value;
    setHostname(hostname);
  };

  const handlePing = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      PingService.ping(hostname).then(
        (res) => {
          const resMessage = res.message;
          setLoading(false);
          setMessage(resMessage);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <Form onSubmit={handlePing} ref={form}>
          <div className="form-group">
            <label htmlFor="hostname">Hostname</label>
            <Input
              type="text"
              className="form-control"
              name="hostname"
              value={hostname}
              onChange={onChangeHostname}
              validations={[required, validateHost]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Ping</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-info" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default PingTest;
