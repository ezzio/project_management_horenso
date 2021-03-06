import { Form, Select, Spin } from "antd";
import { API } from "api/configApi";
import axios from "axios";
import debounce from "lodash/debounce";
import React, { useMemo, useRef, useState } from "react";
import "../../TeammateFeature.scss";
const hideItem = {
  display: "none",
};

FormAddTeammate.propTypes = {};

function FormAddTeammate(props) {
  const { form, listTeammate } = props;

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
        onSelect={(params, options) =>
          form.setFieldsValue({
            avatar: options.avatar,
          })
        }
        allowClear
      />
    );
  } // Usage of DebounceSelect

  async function fetchUserList(username) {
    console.log("fetching user", username);
    return axios
      .post(`${API}/user/findUserName`, {
        user_name: username,
      })
      .then((response) => {
        var searchTeammate = response.data.listUserFound;
        console.log("search list: ", searchTeammate);

        var finalSearchList = searchTeammate.filter(
          (x) => !listTeammate.some((y) => x.user_name === y.user_name)
        );

        console.log("difference: ", finalSearchList);

        return finalSearchList.map((user) => ({
          label: `${user.user_name} (${user.display_name})`,
          value: user.user_name,
          avatar: user.avatar,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const onSubmitForm = (values) => {
    // onFinish(values);
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
      <Form.Item style={hideItem} name="avatar"></Form.Item>
    </Form>
  );
}

export default FormAddTeammate;
