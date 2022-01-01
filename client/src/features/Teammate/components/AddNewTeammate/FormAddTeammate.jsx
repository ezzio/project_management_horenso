import { Form, Input, Select, Spin } from "antd";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useMemo, useRef, useState } from "react";
import "../../TeammateFeature.scss";

FormAddTeammate.propTypes = {};

function FormAddTeammate(props) {
  const { onFinish, form } = props;
  const [selectedOption, setSelectedOption] = useState({
    user_name: "",
  });

  function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);

    const fetchRef = useRef(0);
    const debounceFetcher = useMemo(() => {
      const loadOptions = (value) => {
        fetchRef.current += 1;
        const fetchId = fetchRef.current;
        setOptions([]);
        setFetching(true);
        fetchOptions(value).then((newOptions) => {
          if (fetchId !== fetchRef.current) {
            return;
          }
          setOptions(newOptions);
          setFetching(false);
        });
      };

      return debounce(loadOptions, debounceTimeout);
    }, [fetchOptions, debounceTimeout]);
    return (
      <Select
        labelInValue
        filterOption={false}
        onSearch={debounceFetcher}
        notFoundContent={fetching ? <Spin size="small" /> : null}
        {...props}
        options={options}
        onSelect={(param) =>
          setSelectedOption({
            user_name: param.value,
          })
        }
        allowClear
      />
    );
  } // Usage of DebounceSelect

  async function fetchUserList(username) {
    console.log("fetching user", username);
    return axios
      .post("https://servernckh.herokuapp.com/user/findUserName", {
        user_name: username,
      })
      .then((response) => {
        return response.data.listUserFound.map((user) => ({
          label: `${user.user_name}`,
          value: user.user_name,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitForm = (values) => {
    onFinish(values);
    setValue([]);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [value, setValue] = useState([]);

  return (
    <Form
      form={form}
      autoComplete="off"
      onFinishFailed={onFinishFailed}
      onFinish={onSubmitForm}
    >
      <Form.Item
        initialValue={selectedOption.length > 0 ? selectedOption : []}
        name="user_name"
        rules={[{ required: true, message: "Please Select your teammate!" }]}
      >
        <DebounceSelect
          mode="multiple"
          value={value}
          placeholder="Select users"
          onChange={(newValue) => {
            setValue(newValue);
          }}
          fetchOptions={fetchUserList}
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
    </Form>
  );
}

export default FormAddTeammate;
