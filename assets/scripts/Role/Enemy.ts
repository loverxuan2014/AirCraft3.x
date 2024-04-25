import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends Component {

    enemyDie(){
        setTimeout(() => {
            this.node?.destroy();
        }, 100);
        console.log("Ö´ÐÐÏú»ÙµÐÈË");
    }
}


