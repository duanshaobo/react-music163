// 导入路由组件
import { Switch,Route,Redirect } from 'react-router-dom'
// 函数组件
// props.routes: 路由规则数组
function RouterView(props){
    return <Switch>
        {
           props.routes.map((item,index)=>{
               if(item.component){
                    return <Route key={index} path={item.path} component={item.component} exact={item.exact}/>
               }else{
                    return <Route key={index} path={item.path} exact={item.exact}>
                        <Redirect to={item.to}/>
                    </Route>
               }
               
           }) 
        }
    </Switch>
}

// 导出
export default RouterView;