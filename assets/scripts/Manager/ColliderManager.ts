import { _decorator, Component, Node, PhysicsSystem2D, Contact2DType, BoxCollider2D} from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { Enemy } from '../Role/Enemy';
import { Player } from '../Role/Player';

const { ccclass, property } = _decorator;

@ccclass('ColliderManager')
export class ColliderManager extends Component {
    onLoad() {
        //全局注册碰撞回调函数
        PhysicsSystem2D.instance?.on(Contact2DType.BEGIN_CONTACT, this.onContactListen, this);
    }

    /* 
    我方子弹 tag = 0
    敌方飞机 tag = 1
    玩家飞机 tag = 2
    敌方子弹 tag = 3
    */
    onContactListen(selfCollider: BoxCollider2D, otherCollider: BoxCollider2D) {
        //我方子弹与敌机碰撞时
        if ((selfCollider.tag === 0 && otherCollider.tag === 1) || (selfCollider.tag === 1 && otherCollider.tag === 0)) {
            selfCollider.tag === 0 ? selfCollider.getComponent(Bullet).bulletDie() : selfCollider.getComponent(Enemy).enemyDie();
            otherCollider.tag === 1 ? otherCollider.getComponent(Enemy).enemyDie() : otherCollider.getComponent(Bullet).bulletDie();
       }
       //敌方飞机与我方飞机碰撞时
       if((selfCollider.tag === 1 && otherCollider.tag === 2) || (selfCollider.tag === 2 && otherCollider.tag === 1)){
            selfCollider.tag === 1 ? selfCollider.getComponent(Enemy).enemyDie() : selfCollider.getComponent(Player).playerDie();
            otherCollider.tag === 2 ? otherCollider.getComponent(Player).playerDie() : otherCollider.getComponent(Enemy).enemyDie();
       }
       //敌方子弹与我方飞机碰撞时
       if((selfCollider.tag === 3 && otherCollider.tag === 2) || (selfCollider.tag === 2 && otherCollider.tag === 3)){

       }
    }
}

