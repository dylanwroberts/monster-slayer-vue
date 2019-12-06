new Vue({
  el: '#app',
  data: {
    active: false,
    monsterHealth: 100,
    playerHealth: 100,
    winMsg: '',
    history: []
  },
  methods: {
    random: function(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    reset: function() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.history = [];
      this.winMsg = '';
    },
    //simulates the player and monster attacking eachother, then stores the result
    attack: function(maxHit, minHit = 0) {
      //calculate the player/monster's random damage - monster does more
      let playerDamage = this.random(minHit, Math.ceil(maxHit / 2));
      let monsterDamage = this.random(minHit, maxHit);

      //if the monster deals more damage than the player has
      if (this.playerHealth - monsterDamage <= 0) {
        this.playerHealth = 0;
        this.winMsg = 'the monster won the game. Better luck next time!';
        this.active = false;
      } else {
        this.playerHealth -= monsterDamage;
      }

      //if the player deals more damage than the monster has
      if (this.monsterHealth - playerDamage <= 0) {
        this.monsterHealth = 0;
        this.winMsg = 'congratulations! you beat the monster';
        this.active = false;
      } else {
        this.monsterHealth -= playerDamage;
      }

      //store the attack
      this.history.push({
        player: `player took ${monsterDamage} damage`,
        monster: `monster took ${playerDamage} damage`
      });
    },
    heal: function() {
      let monsterDamage = this.random(0, 20);
      let healAmount = this.random(0, 20);

      //if the monster deals more damage than the player has
      if (this.playerHealth - monsterDamage <= 0) {
        this.playerHealth = 0;
        this.winMsg = 'the monster won the game. Better luck next time!';
        this.active = false;
      } else {
        this.playerHealth += healAmount;
        this.playerHealth -= monsterDamage;

        if (healAmount - monsterDamage > 0) {
          this.history.push({
            player: `the player healed ${healAmount - monsterDamage} health`,
            monster: `took no damage`
          });
        } else {
          this.history.push({
            player: `the player took ${monsterDamage - healAmount} damage`,
            monster: `took no damage`
          });
        }
      }
    }
  }
});
