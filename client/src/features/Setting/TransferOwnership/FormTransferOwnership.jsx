import { Form, Select, Spin } from "antd";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useMemo, useRef, useState } from "react";

function FormTransferOwnership(props) {
  const { onFinish, form, projectOwner } = props;

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
        allowClear
      />
    );
  } // Usage of DebounceSelect

  async function fetchUserList(username) {
    console.log("fetching user", username);
    return axios
      .post("https://servernckhv2.herokuapp.com/user/findUserName", {
        user_name: username,
      })
      .then((response) => {
        var searchTeammate = response.data.listUserFound;
        console.log("search list: ", searchTeammate);

        var finalSearchList = searchTeammate.filter(
          (x) => x.user_name !== projectOwner
        );

        console.log("difference: ", finalSearchList);

        return finalSearchList.map((user) => ({
          label: `${user.user_name} (${user.display_name})`,
          value: user.user_name,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitForm = () => {
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
        name="user_name"
        rules={[{ required: true, message: "Please select user!" }]}
      >
        <DebounceSelect
          mode="multiple"
          value={value}
          placeholder="Select user by user_name"
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

export default FormTransferOwnership;
