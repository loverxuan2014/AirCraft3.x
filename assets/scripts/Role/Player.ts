import { _decorator, Component, Node, NodeEventType, v3, Prefab, EventTouch} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    @property(Prefab)
    private bulletLv1_Pre = null;
/*  
    @property(Prefab)
    private bulletLv2_Pre = null;
    @property(Prefab)
    private bulletLv3_pre = null;
    @property(Prefab)
    private bulletLv4_pre = null;
*/
    bulletShootCD: number = 0.5;

    start() {
        //控制飞机移动
        this.node.on(NodeEventType.TOUCH_MOVE, (touchPos: EventTouch) => {
            this.node.setWorldPosition(
                v3(touchPos.getLocation().x, touchPos.getLocation().y)
            );
        });
        //子弹发射
        this.schedule(() => {
            let playerBullet: Node = this.bulletLv1_Pre;
            playerBullet.setParent(this.node.parent);
            playerBullet.setPosition(v3(this.node.getPosition().x, this.node.getPosition().y + 50));
        },this.bulletShootCD);
    }

    //update(deltaTime: number) {}
}