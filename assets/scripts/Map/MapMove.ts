import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapMove')
export class MapMove extends Component {
    @property
    MoveSpeed: number = 0;

    start() {

    }

    update(deltaTime: number) {
        //���ó���ѭ��ƴ���ƶ����ƶ��ٶȲ�����¶���ⲿ
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