import {Projectile} from "./projectile.js";
import * as EnemyController from "/Controllers/enemy-control.js";
import {isExclusiveIntervals} from "/Utilities/math.js";

// -----------------------------------------
// ----------- Enemy Circle Class ----------
// -----------------------------------------

export function ProjectileFriendly(posX, posY, angle, speed){
    // Dimensions
    this.width = 2;
    this.height = 5;

    // Colour of projectile
    this.colour = "#062569";

    // Center point of the projectile
    this.posX = posX;
    this.posY = posY;

    // Speed and direction of the projectile
    this.dir = 1; // 1 - up, -1 - down
    this.speed = speed;

    // Angle of projectile
    this.angle = angle;

    // Projectile status
    this.isDestroyed = false;

    // Projectile dmg
    this.damage = 1;
}

// Inherit from projectile.js
ProjectileFriendly.prototype = new Projectile();

// Functions of object (Class)
ProjectileFriendly.prototype.checkEnemyCollision = checkEnemyCollision;

// -----------------------------------------
// --------Implemented Abstract Methods ----
// -----------------------------------------
function checkEnemyCollision(){
    var i;
    var enemies = EnemyController.getEnemies();

    for(i = 0; i < enemies.length; i++){
        var enemy = enemies[i];
        if (!isExclusiveIntervals(this.getHitBoxLeftX(), this.getHitBoxRightX(), enemy.hitBoxLeftX, enemy.hitBoxRightX) && 
            !isExclusiveIntervals(this.getHitBoxTopY(), this.getHitBoxBottomY(), enemy.hitBoxTopY, enemy.hitBoxBottomY)){
            // For now just destroy both projectile and enemy immediatley
            enemy.applyDamage(this.damage);
            this.destroyProjectile();
        }
    }
}