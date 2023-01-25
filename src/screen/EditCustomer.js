import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Picker } from "@react-native-picker/picker";
import Alert from "../components/Alert";
import Card from "../components/Card";
import ModalConfirmation from "../components/ModalConfirmation";
import { Storage, ApiHelpers, MyHelpers } from "@helpers";

export class EditCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      arrBranch: [],
      arrProduct: [],
      arrUser: [],
      branchSelected: null,
      productSelected: null,
      tenorSelected: null,
      isAlertSuccess: false,
      isAlertError: false,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      idCust: null,
    };
  }
  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getMasterBranch();
    this.getMasterProduct();
    this.GetDataCustomer();
    // console.log(this.state.startdate);
    // });
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  getMasterBranch = async () => {
    let arrData = [];
    let response = await ApiHelpers.get(
      this.props.navigation,
      "GetMasterBranch"
    );
    if (response.status === 200) {
      this.setState({ arrBranch: response.values });
    } else {
      this.setState({ isAlertError: true });
    }
  };

  getMasterProduct = async () => {
    let arrProduct = [];
    let response = await ApiHelpers.get(
      this.props.navigation,
      "GetMasterProduct"
    );
    if (response.status === 200) {
      this.setState({ arrProduct: response.values });
    } else {
      this.setState({ isAlertError: true });
    }
  };

  GetDataCustomer = async () => {
    const { id } = this.props.route.params;
    let response = await ApiHelpers.get(
      this.props.navigation,
      `GetDataCustomer/${id}`
    );
    if (response.status === 200) {
      response.values.map((data) => {
        this.setState({
          firstName: data.FIRST_NAME,
          lastName: data.LAST_NAME,
          phoneNumber: data.PHONE_NO,
          branchSelected: data.BRANCH_ID,
          productSelected: data.PRODUCT_ID,
          tenorSelected: data.TENOR_ID,
        });
      });
    } else {
      this.setState({ isAlertError: true });
    }
  };

  UpdateDataCust = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    const { id } = this.props.route.params;
    this.request(id, "UpdateDataCust", uniq);
    let response = await ApiHelpers.post(
      this.props.navigation,
      `UpdateDataCust/${id}`,
      {
        FIRST_NAME: this.state.firstName,
        LAST_NAME: this.state.lastName,
        PHONE_NO: this.state.phoneNumber,
        BRANCH_ID: this.state.branchSelected,
        PRODUCT_ID: this.state.productSelected,
        TENOR_ID: this.state.tenorSelected,
        AVATAR: "https://i.pravatar.cc/50?u={sequence}",
      }
    );
    if (response.status === 200) {
      this.setState({ isAlertSuccess: true,  message: 'Success Update' });
    //   this.GetAllDataCust();
    } else {
      this.setState({ isAlertError: true,  message: 'Error Update' });
    }
    this.logResponse(
        id,
        "UpdateDataCust",
        uniq,
        response.status,
        response.message
      );
  };
  request = async (param, endpoint, uniq) => {
    let responseRequest = await ApiHelpers.post(
      this.props.navigation,
      "logRequest",
      {
        ENDPOINT: endpoint,
        PARAMETER_IN: param,
        LOG_ID: uniq,
      }
    );
    if (responseRequest.status === 200) {
    } else {
      this.setState({ isAlertError: true });
    }
  };

  logResponse = async (param, endpoint, uniq, res, msg) => {
    let responseRequest = await ApiHelpers.post(
      this.props.navigation,
      "logResponse",
      {
        ENDPOINT: endpoint,
        PARAMETER_IN: param,
        LOG_ID: uniq,
        RESPONSE_CODE: res,
        RESPONSE_MESSAGE: msg,
      }
    );
    if (responseRequest.status === 200) {
    } else {
      this.setState({ isAlertError: true });
    }
  };
  render() {
    const {
      modalVisible,
      arrBranch,
      branchSelected,
      arrProduct,
      productSelected,
      tenorSelected,
      isAlertSuccess,
      arrUser,
      firstName,
      lastName,
      phoneNumber,
      isAlertError
    } = this.state;
    console.log(firstName);
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
          >
            Update Data Customer
          </Text>
        </View>

        <ScrollView>
          <TextInput
            onChangeText={(text) => this.setState({ firstName: text })}
            value={firstName}
            defaultValue={firstName}
            maxLength={30}
            placeholder="First Name"
            style={styles.input}
          />
          <TextInput
            onChangeText={(text) => this.setState({ lastName: text })}
            value={lastName}
            maxLength={30}
            placeholder="Last Name"
            style={styles.input}
          />
          <TextInput
            keyboardType="numeric"
            placeholder="Phone Number"
            maxLength={13}
            onChangeText={(text) => this.setState({ phoneNumber: text })}
            value={phoneNumber}
            style={styles.input}
          />

          <View style={styles.select}>
            <Picker
              placeholder="Select Branch"
              selectedValue={branchSelected}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ branchSelected: itemValue })
              }
            >
              <Picker.Item label="Select Branch" value="java" />
              {arrBranch.map((branch) => (
                <Picker.Item
                  label={branch.BRANCH_NAME}
                  value={branch.BRANCH_ID}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.select}>
            <Picker
              placeholder="Select Product Name"
              selectedValue={productSelected}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ productSelected: itemValue })
              }
            >
              <Picker.Item label="Select Product Name" value="java" />
              {arrProduct.map((product) => (
                <Picker.Item
                  label={product.PRODUCT_NAME}
                  value={product.PRODUCT_ID}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.select}>
            <Picker
              placeholder="Select Tenor"
              selectedValue={tenorSelected}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ tenorSelected: itemValue })
              }
            >
              <Picker.Item label="Select Tenor" value="0" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="12" value="12" />
              <Picker.Item label="24" value="24" />
              <Picker.Item label="36" value="36" />
              <Picker.Item label="48" value="48" />
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => this.UpdateDataCust()}
            style={{
              backgroundColor: "#24753a",
              paddingVertical: 17,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Submit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: "#757124",
              paddingVertical: 17,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 10,
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Back
            </Text>
          </TouchableOpacity>
          {isAlertSuccess && <Alert message={"Update Success"} />}
          {isAlertError && <Alert message={"Update Error"} />}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    paddingTop: 50,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  input: {
    borderWidth: 0.7,
    borderColor: "#bfbfbf",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  select: {
    borderWidth: 0.7,
    borderColor: "#bfbfbf",
    paddingHorizontal: 10,
    paddingVertical: 0,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default EditCustomer;
