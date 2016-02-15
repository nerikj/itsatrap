import p2 from 'p2';

export const Material = {
  NONE: new p2.Material()
};

export const ContactMaterial = {
  NONE_NONE: new p2.ContactMaterial(Material.NONE, Material.NONE, {
    restitution: 0.2,
    friction: 0
    //stiffness : Number.MAX_VALUE // We need infinite stiffness to get exact restitution
  })
};

export default Material;
