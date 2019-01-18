#----------- React Diff 算法 --------------

#开发建议:
（1） 开发组件时，保持稳定的DOM结构有助于维持整体的性能。换而言之，尽可能少地动态操作DOM结构，尤其是移动操作。当节点数过大或者页面更新次数过多时，页面卡顿的现象比较明显。可以通过 CSS 隐藏或显示节点，而不是真的移除或添加 DOM 节点。

（2）开发组件时，注意使用 shouldComponentUpdate() 来减少组件不必要的更新。除此之外，对于类似的结构应该尽量封装成组件，既减少代码量，又能减少component diff的性能消耗。

（3）对于列表结构，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，在一定程度上会影响 React 的渲染性能。

不建议在 getDefaultProps、getInitialState、shouldComponentUpdate、componentWillUpdate、render 和 componentWillUnmount 中调用 setState，特别注意：不能在 shouldComponentUpdate 和 componentWillUpdate中调用 setState，会导致循环调用。
如果在 shouldComponentUpdate 或 componentWillUpdate 中调用 setState，此时的状态已经从 RECEIVING_PROPS -> NULL，则 performUpdateIfNecessary 就会调用 updateComponent 进行组件更新，但 updateComponent 又会调用 shouldComponentUpdate 和 componentWillUpdate，因此造成循环调用，使得浏览器内存占满后崩溃。

#-------- React Lifecycle ------------
#React的生命周期具体可分为四种情况：
当首次装载组件时，按顺序执行 getDefaultProps、getInitialState、componentWillMount、render 和 componentDidMount；

当卸载组件时，执行 componentWillUnmount；

当重新装载组件时，此时按顺序执行 getInitialState、componentWillMount、render 和 componentDidMount，但并不执行 getDefaultProps；

当再次渲染组件时，组件接受到更新状态，此时按顺序执行 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

#React组件的3种状态
状态一：MOUNTING
mountComponent 负责管理生命周期中的 getInitialState、componentWillMount、render 和 componentDidMount。

状态二：RECEIVE_PROPS
updateComponent 负责管理生命周期中的 componentWillReceiveProps、shouldComponentUpdate、componentWillUpdate、render 和 componentDidUpdate。

状态三：UNMOUNTING
unmountComponent 负责管理生命周期中的 componentWillUnmount。

首先将状态设置为 UNMOUNTING，若存在 componentWillUnmount，则执行；如果此时在 componentWillUnmount 中调用 setState，是不会触发 reRender。更新状态为 NULL，完成组件卸载操作。实现代码如下：
// 卸载组件
unmountComponent: function() {
    // 设置状态为 UNMOUNTING
    this._compositeLifeCycleState = CompositeLifeCycle.UNMOUNTING;
    
    // 如果存在 componentWillUnmount，则触发
    if (this.componentWillUnmount) {
        this.componentWillUnmount();
    }
    
    // 更新状态为 null
    this._compositeLifeCycleState = null;
    this._renderedComponent.unmountComponent();
    this._renderedComponent = null;
    
    ReactComponent.Mixin.unmountComponent.call(this);
}
#React生命周期总结:
生命周期	                调用次数	能否使用setState()
getDefaultProps	                1	        否
getInitialState	                1	        否
componentWillMount	            1	        是
render	                        >=1	        否
componentDidMount	              1	        是
componentWillReceiveProps	      >=0	        是
shouldComponentUpdate	          >=0	        否
componentWillUpdate	            >=0	        否
componentDidUpdate	            >=0	        否
componentWillUnmount	          1	        否
componentDidUnmount	            1	        否

setState实现机制
setState是React框架的核心方法之一，下面介绍一下它的原理：
// 更新 state
setState: function(partialState, callback) {
  // 合并 _pendingState
  this.replaceState(
    assign({}, this._pendingState || this.state, partialState),
    callback
  );
},

当调用 setState 时，会对 state 以及 _pendingState 更新队列进行合并操作，但其实真正更新 state 的幕后黑手是replaceState

// 更新 state
replaceState: function(completeState, callback) {
  validateLifeCycleOnReplaceState(this);
 
  // 更新队列
  this._pendingState = completeState;
 
  // 判断状态是否为 MOUNTING，如果不是，即可执行更新
  if (this._compositeLifeCycleState !== CompositeLifeCycle.MOUNTING) {
    ReactUpdates.enqueueUpdate(this, callback);
  }
},
replaceState 会先判断当前状态是否为 MOUNTING，如果不是即会调用 ReactUpdates.enqueueUpdate 执行更新。

当状态不为 MOUNTING 或 RECEIVING_PROPS 时，performUpdateIfNecessary 会获取 _pendingElement、_pendingState、_pendingForceUpdate，并调用 updateComponent 进行组件更新。

// 如果存在 _pendingElement、_pendingState、_pendingForceUpdate，则更新组件
performUpdateIfNecessary: function(transaction) {
  var compositeLifeCycleState = this._compositeLifeCycleState;
 
  // 当状态为 MOUNTING 或 RECEIVING_PROPS时，则不更新
  if (compositeLifeCycleState === CompositeLifeCycle.MOUNTING ||
      compositeLifeCycleState === CompositeLifeCycle.RECEIVING_PROPS) {
    return;
  }
 
  var prevElement = this._currentElement;
  var nextElement = prevElement;
  if (this._pendingElement != null) {
    nextElement = this._pendingElement;
    this._pendingElement = null;
  }
 
  // 调用 updateComponent
  this.updateComponent(
    transaction,
    prevElement,
    nextElement
  );
}

如果在 shouldComponentUpdate 或 componentWillUpdate 中调用 setState，此时的状态已经从 RECEIVING_PROPS -> NULL，则 performUpdateIfNecessary 就会调用 updateComponent 进行组件更新，但 updateComponent 又会调用 shouldComponentUpdate 和 componentWillUpdate，因此造成循环调用，使得浏览器内存占满后崩溃。

#开发建议
不建议在 getDefaultProps、getInitialState、shouldComponentUpdate、componentWillUpdate、render 和 componentWillUnmount 中调用 setState，特别注意：不能在 shouldComponentUpdate 和 componentWillUpdate中调用 setState，会导致循环调用。


