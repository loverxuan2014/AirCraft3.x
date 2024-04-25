import { _decorator, Component, Node, Contact2DType, NodeEventType, v3, Prefab, EventTouch, instantiate, PhysicsSystem2D, Collider2D} from 'cc';
import { Bullet } from '../Bullet/Bullet';
import { Enemy } from './Enemy';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Prefab)
    private bulletLv1_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv2_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv3_pre: Prefab = null;
    @property(Prefab)
    private bulletLv4_pre: Prefab = null;

    bulletShootCD: number = 0.5;
    playerLevel: number = 1;
    KillScore: number = 0;

    onLoad() {
        //全局注册碰撞回调函数
        PhysicsSystem2D.instance?.on(Contact2DType.BEGIN_CONTACT, this.onContactListen, this);
        console.log("成功注册回调");
    }

    start() {
        //控制飞机移动
        this.node.on(NodeEventType.TOUCH_MOVE, (touchPos: EventTouch) => {
            this.node.setWorldPosition(
                v3(touchPos.getLocation().x, touchPos.getLocation().y)
            );
        });
        //子弹发射
        this.schedule(() => {
            let playerBullet: Node = null;
            switch (this.playerLevel) {
                case 1: playerBullet = instantiate(this.bulletLv1_Pre);
                    break;
                case 2: playerBullet = instantiate(this.bulletLv2_Pre);
                    break;
                case 3: playerBullet = instantiate(this.bulletLv3_pre);
                    break;
                case 4: playerBullet = instantiate(this.bulletLv4_pre);
                    break;
                default: console.log("飞机等级异常");
            }
            playerBullet.setParent(this.node.getParent());
            playerBullet.setPosition(v3(this.node.getPosition().x, this.node.getPosition().y + 50));
        },this.bulletShootCD);
    }

    onContactListen(selfCollider: Collider2D, otherCollider: Collider2D) {
        console.log(selfCollider.name + "与" + otherCollider.name + "开始碰撞");
        if ((selfCollider.tag === 0 && otherCollider.tag === 1) || (selfCollider.tag === 1 && otherCollider.tag === 0)) {
            selfCollider.tag === 0 ? selfCollider.getComponent(Bullet).bulletDie() : selfCollider.getComponent(Enemy).enemyDie();
            console.log("通知销毁1");
            otherCollider.tag === 1 ? otherCollider.getComponent(Enemy).enemyDie() : otherCollider.getComponent(Bullet).bulletDie();
            console.log("通知销毁2");
        }
    }

    //update(deltaTime: number) {}
}