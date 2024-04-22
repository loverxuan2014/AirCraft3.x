import { _decorator, Component, Node, NodeEventType, v3} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    start() {
        this.node.on(NodeEventType.TOUCH_MOVE, (touchPos) => {
            this.node.setWorldPosition(
                v3(touchPos.getLocation().x, touchPos.getLocation().y)
            );
        });
    }

    update(deltaTime: number) {
        
    }
}