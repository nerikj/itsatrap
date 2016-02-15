import p2 from 'p2';

export const Material = {
  BALL: new p2.Material(),
  PLAYER: new p2.Material(),
  WALL: new p2.Material()
};

export const ContactMaterial = {
  BALL_PLAYER: new p2.ContactMaterial(Material.BALL, Material.PLAYER, {
    restitution: 0.2,
    friction: 0
    //stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
  }),
  BALL_WALL: new p2.ContactMaterial(Material.BALL, Material.WALL, {
    restitution: 0.2,
    friction: 0,
    stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
  }),
  PLAYER_WALL: new p2.ContactMaterial(Material.PLAYER, Material.WALL, {
    restitution: 0.2,
    friction: 0,
    stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
  })
};

export default Material;
