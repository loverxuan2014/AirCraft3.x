import { _decorator, Component, Node, NodeEventType, v3, Prefab, EventTouch, instantiate, Vec3, math } from 'cc';
import { Map } from '../Map/Map';
import { Result } from '../UI/Result';

const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    //外部属性
    @property(Prefab)
    private bulletLv1_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv2_Pre: Prefab = null;
    @property(Prefab)
    private bulletLv3_pre: Prefab = null;
    @property(Prefab)
    private bulletLv4_pre: Prefab = null;
    @property(Node)
    otherNode1: Node = null;

    //配置属性
    playerLevel: number = 1;
    KillScore: number = 0;
    rebirthTimes: number = 3;
    dieState: boolean = false;
    bornPos: Vec3 = null;
    bulletShootCD: number = 0.5;
    curShootCD: number = 0;

    //Desc
    NoPlaneLevel: string = "飞机等级异常。";

    start() {
        //获取重生点坐标
        this.bornPos = this.node.getPosition();
    }


    update(deltaTime: number) {
        let isDie: boolean = this.dieState;
        if (isDie == false) {
            //控制飞机移动
            this.node.on(NodeEventType.TOUCH_MOVE, (touchPos: EventTouch) => {
                this.node.setWorldPosition(
                    v3(touchPos.getLocation().x, touchPos.getLocation().y)
                );
            });
            //控制子弹发射
            if(this.bulletShootCD != 0){
                this.curShootCD += deltaTime;
                if(this.curShootCD > this.bulletShootCD){
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
                        default: console.error(this.NoPlaneLevel);
                    }
                    playerBullet.setParent(this.node.getParent());
                    playerBullet.setPosition(v3(this.node.getPosition().x, this.node.getPosition().y + 100));
                    this.curShootCD = 0;
                } 
            }                 
        }
        else{
            this.node.setPosition(this.bornPos);                
        }

        if(this.KillScore >= 30 && this.KillScore < 100){
            this.otherNode1.getComponent(Map).stopPlaneBorn();
            this.otherNode1.getComponent(Map).BossBorn();
        }
        else if(this.KillScore >= 100){
            this.StagePass();
        }
    }

    //玩家死亡
    playerDie() {
        if(this.rebirthTimes <= 0){
            this.StageFail();
        }
        else{
            this.dieState = true;
            this.otherNode1.getComponent(Map).MapMoveSpeed = 0;
            this.node.parent.getChildByName("Result").getComponent(Result).Show("Die(" + this.rebirthTimes + ")","#E9A224");
            /*
            resources.load(
                "Images/Img/planeDestory/spriteFrame",
                SpriteFrame,
                (err: Error, res: SpriteFrame) => {
                    if (err) {
                        return console.error("load SpriteFrame failed:" + err);
                    }
                    this.node.getComponent(Sprite).spriteFrame = res;
                });
            */
            this.otherNode1.getComponent(Map).stopPlaneBorn();
            this.rebirthTimes -= 1;
            console.log("剩余生命：" + this.rebirthTimes);
            setTimeout(() => {
                this.dieState = false;
                this.otherNode1.getComponent(Map).PlaneBorn();
                this.otherNode1.getComponent(Map).MapMoveSpeed = 100;
                this.node.parent.getChildByName("Result").getComponent(Result).label.enabled = false;
            }, 3000);
        }
    }
    
    //闯关成功
    StagePass(){
        this.dieState = true;
        this.otherNode1.getComponent(Map).MapMoveSpeed = 0;
        this.otherNode1.getComponent(Map).stopPlaneBorn();
        this.node.parent.getChildByName("Result").getComponent(Result).Show("Victory","#EBFF00");
    }

    //闯关失败
    StageFail(){
        this.dieState = true;
        this.otherNode1.getComponent(Map).MapMoveSpeed = 0;
        this.otherNode1.getComponent(Map).stopPlaneBorn();
        this.node.parent.getChildByName("Result").getComponent(Result).Show("Fail","#A9AA9A");
    }
}