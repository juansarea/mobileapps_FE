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
import AlertError from "../components/AlertError";
import Card from "../components/Card";
import ModalConfirmation from "../components/ModalConfirmation";
import { Storage, ApiHelpers, MyHelpers } from "@helpers";

export class Home extends Component {
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
      message: "",
      number: [],
    };
  }
  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getMasterBranch();
    this.getMasterProduct();
    this.GetAllDataCust();

    const options = [];
    obj = {};

    for (var i = 0; i < 61; i++) {
      var obj = {};
      // obj["number"] = [i];
      let num = options.push({ i });
      this.setState({ number: num });
    }

    // });
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  getMasterBranch = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    this.request("", "GetMasterBranch", uniq);
    let response = await ApiHelpers.get(
      this.props.navigation,
      "GetMasterBranch"
    );
    if (response.status === 200) {
      this.setState({ arrBranch: response.values });
    } else {
      this.setState({ isAlertError: true });
    }
    this.logResponse(
      "",
      "GetMasterBranch",
      uniq,
      response.status,
      response.message
    );
  };

  getMasterProduct = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    this.request("", "GetMasterProduct", uniq);
    let response = await ApiHelpers.get(
      this.props.navigation,
      "GetMasterProduct"
    );
    if (response.status === 200) {
      this.setState({ arrProduct: response.values });
    } else {
      this.setState({ isAlertError: true });
    }
    this.logResponse(
      "",
      "GetMasterProduct",
      uniq,
      response.status,
      response.message
    );
  };

  GetAllDataCust = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    this.request("", "GetAllDataCust", uniq);
    let response = await ApiHelpers.get(
      this.props.navigation,
      "GetAllDataCust"
    );
    if (response.status === 200) {
      this.setState({ arrUser: response.values });
    } else {
      this.setState({ isAlertError: true });
    }
    this.logResponse(
      "",
      "GetAllDataCust",
      uniq,
      response.status,
      response.message
    );
  };

  DeleteDataCust = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    this.request(this.state.idCust, "DeleteDataCust", uniq);
    let response = await ApiHelpers.post(
      this.props.navigation,
      "DeleteDataCust",
      { id: this.state.idCust }
    );
    if (response.status === 200) {
      this.setState({
        isAlertSuccess: true,
        modalVisible: false,
        idCust: null,
        message: "Delete Success",
      });
      this.GetAllDataCust();
    } else {
      this.setState({
        isAlertError: true,
        modalVisible: false,
        idCust: null,
        message: "Delete Error",
      });
    }
    this.logResponse(
      this.state.idCust,
      "DeleteDataCust",
      uniq,
      response.status,
      response.message
    );
  };

  SaveDataCust = async () => {
    let uniq = Math.floor(Math.random() * 10000000);
    this.request("", "SaveDataCust", uniq);
    let response = await ApiHelpers.post(
      this.props.navigation,
      "SaveDataCust",
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
      this.setState({
        isAlertSuccess: true,
        firstName: null,
        lastName: null,
        phoneNumber: null,
        branchSelected: null,
        productSelected: null,
        tenorSelected: null,
        message: "Submit Success",
      });
      this.GetAllDataCust();
    } else {
      this.setState({ isAlertError: true, message: "Error Save Data" });
    }

    this.logResponse(
      "",
      "SaveDataCust",
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

  clearForm = () => {
    this.setState({
      firstName: null,
      lastName: null,
      phoneNumber: null,
      branchSelected: null,
      productSelected: null,
    });
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
      message,
      isAlertError,
      number,
    } = this.state;

    // console.log('number', number);

    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <ModalConfirmation
          onOpen={modalVisible}
          onClose={() => this.setState({ modalVisible: false, idCust: null })}
          onDelete={() => this.DeleteDataCust()}
        />

        <View style={{ marginBottom: 20 }}>
          <Text
            style={{ fontSize: 25, fontWeight: "bold", textAlign: "center" }}
          >
            Form Data Customer
          </Text>
        </View>

        <ScrollView>
          <TextInput
            onChangeText={(text) => this.setState({ firstName: text })}
            value={firstName}
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
              <Picker.Item label={"Select Tenor"} value={null} />
              {Array.from(Array(60), (e, i) => {
                return <Picker.Item label={i + 1 + ""} value={i} />;
              })}
              {/* {number.map((num) => (
                <Picker.Item label={num.i} value={num.i} />
              ))} */}
            </Picker>
          </View>

          <TouchableOpacity
            onPress={() => this.SaveDataCust()}
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
            onPress={() => this.clearForm()}
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
              Clear Form
            </Text>
          </TouchableOpacity>
          {isAlertSuccess && <Alert message={message} />}
          {isAlertError && <AlertError message={message} />}

          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: "#bfbfbf",
              marginVertical: 15,
            }}
          />
          {arrUser.map((user) => (
            <Card
              onPress={() =>
                this.props.navigation.navigate("EditCustomer", {
                  id: user.CUST_ID,
                })
              }
              fullName={user.FIRST_NAME + " " + user.LAST_NAME}
              branch={user.BRANCH_NAME}
              product={user.PRODUCT_NAME}
              tenor={user.TENOR_ID}
              avatar={"https://i.pravatar.cc/50?u={sequence}"}
              onOpen={() =>
                this.setState({ modalVisible: true, idCust: user.CUST_ID })
              }
            />
          ))}
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
export default Home;
