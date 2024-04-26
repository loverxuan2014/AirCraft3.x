import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    BulletMoveSpeed: number = 500;
    //start() {}

    update(deltaTime: number) {
        let newX: number = this.node.position.x;
        let newY: number = this.node.position.y + this.BulletMoveSpeed * deltaTime;
        let newZ: number = this.node.position.z;
        this.node.setPosition(newX, newY, newZ);
    }

    bulletDie(){
        //???????????????
        setTimeout(() => {
            this.node?.destroy();
        }, 100);
    }
}


