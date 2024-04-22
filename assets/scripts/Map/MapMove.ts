import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapMove')
export class MapMove extends Component {
    @property
    MoveSpeed: number = 0;

    start() {

    }

    update(deltaTime: number) {
        //设置场景循环拼接移动，移动速度参数暴露给外部
        for (let map of this.node.children) {
            let mapSize = map.getComponent(UITransform).contentSize;
            let newX: number = map.position.x;
            let newY: number = map.position.y - this.MoveSpeed * deltaTime;
            let newZ: number = map.position.z;
            if (newY <= -1 * mapSize.y - 1) {
                newY += mapSize.y * 2;
            }
            map.setPosition(newX, newY, newZ);
        }
    }
}