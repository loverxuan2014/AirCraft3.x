import { _decorator, Component, Node, UITransform, Prefab, instantiate, v3, math } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Map')
export class Map extends Component {
    //�ⲿ����
    @property
    MapMoveSpeed: number = 0;
    @property(Prefab)
    enemyPre: Prefab = null;

    //��������
    enemyBornCD: number = 1000;
    enemyBornY: number = 578;
    planeBorn: number = 0;

    start() {
        //ˢ��
        this.planeBorn = setInterval(() => {
            let enemy = instantiate(this.enemyPre);
            enemy.setParent(this.node.getParent());
            enemy.setPosition(v3(math.randomRange(-260, 260), this.enemyBornY));
        }, this.enemyBornCD);
    }

    update(deltaTime: number) {
        //�����ƶ�
        for (let map of this.node.children) {
            let mapSize = map.getComponent(UITransform).contentSize;
            let newX: number = map.position.x;
            let newY: number = map.position.y - this.MapMoveSpeed * deltaTime;
            let newZ: number = map.position.z;
            if (newY <= -1 * mapSize.y - 1) {
                newY += mapSize.y * 2;
            }
            map.setPosition(newX, newY, newZ);
        }
    }

    stopPlaneBorn(){
        //ֹͣ��ʱ��
        clearInterval(this.planeBorn);
    }
}