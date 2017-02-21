import React from "react" 
import _ from 'lodash'
import Icon from 'antd/lib/icon'
import ButtonGroup from '../components/Button/ButtonGroup'
/**
* 获取处理后的ButtonGroup组件
* @param { object || boolean } action 是否操作 
* @param { int } index 当前数组中form item 索引，所有操作都是作用于当前form item
* @param { array } data 当前form item 数据的父级数据 
*/
function buttonGroupAdapter(action,index,data){
  var buttonGroup;
  if(action){
    if(_.isBoolean(action)){
      action = {
        up_action: true,
        down_action: true,
        add_action: true,
        delete_action: true,
      };
    }
    var options = [];
    var obj;
    if(action.up_action){
      obj = {
        value: "up",
        label: <Icon type="arrow-up"/>,
      }
      if(index === 0){
        obj.disabled = true; 
      }
      options.push(obj);
    }
    if(action.up_action){
      obj = {
        value: "down",
        label: <Icon type="arrow-down"/>,
      }
      if(index === data.length - 1){
        obj.disabled = true;
      }
      options.push(obj);
    }
    if(action.add_action){
      obj = {
        value: "add",
        label: <Icon type="plus"/>,
      }
      options.push(obj);
    }
    if(action.delete_action){
      obj = {
        value: "delete",
        label: <Icon type="delete"/>,
      }
      if((data.length - 1) === 0){
        obj.disabled = true; 
      }
      options.push(obj);
    }
//console.debug(this.context)
    buttonGroup = (
      <ButtonGroup 
        options={ options }
        onChange={ this.onButtonChange && this.onButtonChange(data,index) }
        value={ [] }
      />
    );  
  }
  return buttonGroup;
}

function iconGroupAdater(action,index,data){
  var group;
  if(action){
    var upIcon = (
      <Icon 
        className="mr10"
        type="arrow-up"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("up");
          }
        }
      />
    )
    var downIcon = (
      <Icon 
        className="mr10"
        type="arrow-down"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("down");
          }
        }
      />
    )
    var deleteIcon = (
      <Icon 
        className="mr10"
        type="delete"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("delete");
          }
        }
      />
    )
    if(index === 0){
      upIcon = false;
    }
    if(index === data.length - 1){
      downIcon = false;
    }
    if((data.length - 1) === 0){
      deleteIcon = false;
    }
    group = (
      <span className="icon-group-con">
        { upIcon }
        { downIcon }
        { deleteIcon }
      </span>
    )
  }
  return group;
}

function ItemButtonGroupDecorator(component){
  component.prototype.buttonGroupAdapter = buttonGroupAdapter;
  component.prototype.iconGroupAdater = iconGroupAdater;
}
export default ItemButtonGroupDecorator;
