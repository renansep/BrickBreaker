var checkCollisionSprite = function(self, other)
{
	if (self == null || other == null) return null;
		
	//colisão pela direita ou esquerda de self
	if 
	(
		(self.getPositionY() < other.getPositionY() + other.height/2) && 
		(self.getPositionY() > other.getPositionY() - other.height/2)
	)
	{
		//colisão pela direita de self
		if 
		(
			(self.getPositionX() + self.width/2 > other.getPositionX() - other.width/2) &&
			(self.getPositionX() + self.width/2 < other.getPositionX())
		)
		{
			self.setPosition(new cc.Point(other.getPositionX() - other.width/2 - self.width/2,
										  self.getPositionY()));
			return "right";
		}
		//colisão pela esquerda de self
		else if 
		(
			(self.getPositionX() - self.width/2 < other.getPositionX() + other.width/2) &&
			(self.getPositionX() - self.width/2 > other.getPositionX())
		)
		{
			self.setPosition(new cc.Point(other.getPositionX() + other.width/2 + self.width/2,
										  self.getPositionY()));
			return "left";
		}
	}
	
	//colisão por cima ou por baixo de self
	if 
	(
		(self.getPositionX() < other.getPositionX() + other.width/2) && 
		(self.getPositionX() > other.getPositionX() - other.width/2)
	)
	{
		//colisão cima de self
		if 
		(
		(self.getPositionY() + self.height/2 > other.getPositionY() - other.height/2) &&
			(self.getPositionY() + self.height/2 < other.getPositionY())
		)
		{
			self.setPosition(new cc.Point(self.getPositionX(),
										  other.getPositionY() - other.height/2 - self.height/2));
			return "top";
		}
		//colisão por baixo de self
		else if 
		(
			(self.getPositionY() - self.height/2 < other.getPositionY() + other.height/2) &&
			(self.getPositionY() - self.height/2 > other.getPositionY())
		)
		{
			self.setPosition(new cc.Point(self.getPositionX(),
										  other.getPositionY() + other.height/2 + self.height/2));
			return "bottom";
		}
	}
		
	return null;
}

var checkCollisionLayer = function(object, layer)
{
	if (object == null || layer == null) return null;
	
	if (object.getPositionX() + object.width/2 > layer.width)
	{
		object.setPosition(layer.width - object.width/2, object.getPositionY());
		return "right";
	}
	else if (object.getPositionX() - object.width/2 < 0)
	{
		object.setPosition(object.width/2, object.getPositionY());
		return "left";
	}
	else if (object.getPositionY() + object.height/2 > layer.height)
	{
		object.setPosition(object.getPositionX(), layer.height - object.height/2);
		return "top";
	}
	else if (object.getPositionY() < object.height/2)
	{
		object.setPosition(object.getPositionX(), object.height/2);
		return "bottom";
	}
	return null;
}









