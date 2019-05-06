import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, View, RefreshControl, Modal, Button} from 'react-native';

import {ListsService} from './app/services/ListsService';
import ListsView from './app/views/ListsView';
import List from './app/components/List';

export default class App extends Component {
  state = {
    lists: [],
    isLoading: false,
    modalVisible: false,
    selectedList: {}
  }

  async componentDidMount(){
    await this.getLists();
  }

  getLists = async () => {
    this.setState({isLoading: true});
    const lists = await ListsService.list();
    this.setState({lists, isLoading: false});
    return lists;
  }
  selectList = (selectedList) => {
    this.setState({
      selectedList,
      modalVisible: true
    })
  }
  createList = async () => {
    const newList = await ListsService.create({title: 'Nova Lista', description: '', picture: '', items: []});
    this.setState(({lists}) => {
      const newLists = [...lists, newList];
      return {lists: newLists}
    }, () => {
      this.selectList(newList);
    })
  }
  updateList = (newList) => {
    const lists = [...this.state.lists],
      listIndex = lists.findIndex(list => list.id === newList.id);
    
    lists[listIndex] = newList;
    this.setState({
      lists,
      selectedList: {},
      modalVisible: false
    })
    ListsService.update(lists[listIndex]);
  }
  removeList = (listToRemove) => {
    const lists = this.state.lists.filter(list => list.id !== listToRemove.id);
    this.setState({lists});
    ListsService.remove(listToRemove.id);
  }

  render() {
    const {state} = this;
    return (
      <View style={styles.container}>
        <Button title="+ Nova Lista" onPress={this.createList} style={{flex: 1}} color="green" />
        <ScrollView refreshControl={<RefreshControl
                                        refreshing={state.isLoading}
                                        onRefresh={this.getLists}
                                        />}>
          <ListsView lists={state.lists} onRemove={this.removeList} onSelect={this.selectList} />
        </ScrollView>
     
        <Modal
          animationType="slide"
          transparent={false}
          visible={state.modalVisible}
        >
          <List list={state.selectedList} onActionDone={this.updateList} />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
