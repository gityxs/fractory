$(function() {
	/*
	TEMPLATES = TemplateManager('#html_templates');
	tt_templates = TemplateManager('#tt_templates');
	$scene_holder = $('#scene_holder');

	scene = new Scene();
	$scene_holder.append(scene.$el);
	//tooltipper = Tooltip();

	var shell = new Shell();
	scene.set_shell(shell);

	islot = new InventorySlot();
	scene.$el.append(islot.$el);


	islot2 = new InventorySlot();
	scene.$el.append(islot2.$el);
	islot2.$el.css('top', 100);

	islot3 = new InventorySlot();
	scene.$el.append(islot3.$el);
	islot3.$el.css('top', 300);

	gen = new WhiteGenerator();
	islot.set_part(gen);

	pump1 = new ManaPump();
	islot2.set_part(pump1);

	pump2 = new ManaPump();
	islot3.set_part(pump2);

	scene.shell.nodes.nw2.set_part(gen);
	scene.shell.nodes.wnw.set_part(pump1);

	j = new PumpJunction();
	j.direction('ne');
	j.flow_direction('-1');
	gen.node().links.sw.set_junction(j)

	/*
	$('*').click(function (){
		//console.log("Got a click: ", this);
	});*/
	ko.options.deferUpdates = true;

	loadExternalKnockoutTemplates('', function() {
		var game = window.game = Fractory();
		ko.applyBindings({game: window.game}, $('#game_render')[0]);
		document.title = 'Fractory v' + game.gameVersion;

		game.start_game();
	});


	if('debugging') {
		window.pat = function(loc) {
			return game.view_shell().nodes[loc].part();
		};
	}
});

silence = {
	group: function() {},
	groupEnd: function() {},
	log: function() {},
}

Fractory = Ice.$extend('Fractory', {
	__init__: function() {
		var self = this;
		self.$super();

		self.gameVersion = '0.9.5';

		self.saved_fractal_patterns = ko.observableArray([]);
		self.saved_clear_pattern = ko.observable("-49=");
		self.saved_filled_pattern = ko.observable("+49=");

		self.shell = ko.observable(null);
		self.shell(Shell());
		//working_shell is the one up front.  It should be the growing shell after zoom in, and the fading cell
		// after zoom out.  Oh, no, do it as a stack, silly.
		self.shell_stack = [];
		self.shell_renders = ko.observableArray([]).extend({ notify: 'always' });
		self.shell_renders.push(self.shell());

		self.animating_shell = ko.observable(false).extend({ notify: 'always' });
		self.view_shell = ko.computed(function() {
			return self.shell_renders()[self.shell_renders().length - 1] || null;
		});

		self.mana = ko.observable(0);
		self.paused = ko.observable(true).extend({ notify: 'always' });
		self.level = ko.observable(1);
		self.experience = ko.observable(0);

		self.max_infused_tier = ko.observable(0);

		self.talents_list = ko.observableArray([]);
		self.talents = ko.computed(function() {
			return _.indexBy(self.talents_list(), function(tal) {
				// console.log("Tal is ", tal);
				return tal.code;
			});
		});
		self.boost_talents = ko.computed(function() {
			return _.chain(self.talents_list()).filter(function(tal) {
				return tal.boost_mech_code();
			}).indexBy(function(tal) {
				return tal.boost_mech_code();
			}).value();
		});

		self.total_tp = ko.observable(0);
		self.spent_tp = ko.computed(function() {
			var tot = 0;
			_.each(self.talents_list(), function(tal) {
				tot += tal.points();
			});
			return tot;
		});
		self.unspent_tp = ko.computed(function() {
			return self.total_tp() - self.spent_tp();
		});

		self.upgrades_list = ko.observableArray([]);
		self.upgrades = ko.computed(function() {
			return _.indexBy(self.upgrades_list(), function(ug) {
				return ug.code;
			});
		});

		self.connected_nodes = ko.observableArray([]);
		self.all_nodes = ko.observableArray([]);

		self.focused_part = ko.observable(null);
		self.current_pane = ko.observable('help');

		self.inventory_slots = ko.observableArray([]);
		self.shop_slots = ko.observableArray([]);
		self.trash_slot =ko.observable(TrashSlot());
		self.chosen_shop_slot = ko.observable(null);

		self.unlocked_stats_list = ko.observableArray([]);
		self.unlocked_stats = ko.computed(function() {
			return _.object(self.unlocked_stats_list(), _.map(self.unlocked_stats_list(), function(ul) {
				return ul;
			}));
		});

		self.learned_research_list = ko.observableArray([]);
		self.learned_research = ko.computed(function() {
			return _.object(self.learned_research_list(), _.map(self.learned_research_list(), function(lr) {
				return Researches[lr];
			}));
		});
		self.unlearned_research = ko.computed(function() {
			return _.pick(Researches, function(r) {
				return !self.learned_research()[r];
			})
		});
		self.available_research = ko.computed(function() {
			return _.pick(self.unlearned_research(), function(r) {
				return r.available(self);
			});
		});

		self.boosts_list = ko.observableArray([]);
		self.boosts = ko.computed(function() {
			return _.indexBy(self.boosts_list(), function(boost) {
				return boost.code();
			});
		});
		self.all_parts = ko.computed(function() {
			var in_shell = _.filter(_.map(self.all_nodes(), function(n) {
				return n.part();
			}));
			var in_inventory = _.filter(_.map(self.inventory_slots(), function(is) {
				return is.part();
			}));
			var in_shop = _.filter(_.map(self.shop_slots(), function(ss) {
				return ss.part();
			}));
			return in_shell.concat(in_inventory).concat(in_shop);
		});

		self.arcana = ko.observable(0);
		self.arcana_generated = ko.observable(0);
		self.arcana_spent = ko.observable(0);

		self.mana_generated = ko.observable(0);
		self.spent_mana_list = ko.observableArray([]);
		self.spent_mana = ko.computed(function() {
			return _.indexBy(self.spent_mana_list(), function(sm) {
				return sm.reason;
			});
		});
		self.net_mana = ko.observable(0);

		self.save_ticks = ko.observable(0);

		self.last_moved_part = ko.observable(null);
		self.hovered_node = ko.observable(null);
		self.hovered_part = ko.observable(null);
		self.hovered_inventory_slot = ko.observable(null);

		self.keybindings = KeyBindings();

		if(typeof Analytics !== 'undefined')
			self.analytics = Analytics();

		self.dragging_part = ko.observable(null);
	},
	__keys__: function() {
		return this.$super().concat([
			'shell', 'mana', 'inventory_slots', 'shop_slots', 'unlocked_stats_list',
			'learned_research_list', 'boosts_list',
			'level', 'experience', 'total_tp', 'arcana', 'arcana_spent',
			'max_infused_tier', 'saved_fractal_patterns'
		]);
	},
	start_game: function() {
		var self = this;
		if(localStorage['Fractory.current_game']) {
			self.load_game();
		}
		else {
			self.new_game();
		}
		self.sync_to_gc();
		self.validate_after_load();
                
		//Updating inventory size without ascention\reset
		while(self.inventory_slots().length < 6 + self.talents()['bigger_inventory'].points()*3) {
			self.inventory_slots.push(InventorySlot());
		}
		
		//dirty fix for duping parts using "last moved part"
		self.last_moved_part(null);
                
		self.unpause();
	},
	new_game: function() {
		var self = this;
		self.shell(new Shell());
		self.shell_renders([self.shell()]);
		self.shell_stack = [];
		self.mana(1000);
		self.arcana(0);
		self.arcana_spent(0);
		if(!self.saved_fractal_patterns())
			self.saved_fractal_patterns([]);

		self.max_infused_tier(self.max_infused_tier() ?? 0);

		var core = CorePart();
		core.add_stat('Glow', 200);
		self.shell().nodes.ctr.set_part(core, true);
		//self.shell().nodes.w2.set_part(Part());
		self.shell().refresh_all_flow();

		self.inventory_slots([InventorySlot(), InventorySlot(), InventorySlot(), InventorySlot(), InventorySlot(), InventorySlot()]);
		self.shop_slots([
			ShopSlot('blank'),
			ShopSlot('single'),
			ShopSlot('multi')
		]);
		self.unlocked_stats_list(Mech.STARTING_MECHS.slice());

		_.each(self.talents(), function(tal) {
			if(tal.points()) tal.apply(self);
		});

		_.each(self.upgrades(), function(ug) {
			ug.points(0);
		});

		_.each(self.shop_slots(), function(ss) {
			ss.restock();
		});

		self.keybindings.bind_all_keys();
	},
	save_game: function(save_name) {
		var self = this;
		save_name = save_name || 'current_game';
		self.save_ticks(0);

		var blob = game.as_patch();

		var json = Ice.dumps(blob);
		localStorage['Fractory.current_game'] = json;
		//console.log(json);
		return blob;
	},
	load_game: function(save_name) {
		var self = this;
		save_name = save_name || 'current_game';

		var json = localStorage['Fractory.current_game'];

		blob = Ice.loads(json);

		self.update_from_jsonable(blob);
                
		if(blob.gameVersion != self.gameVersion)
			localStorage['Fractory.backup'] = json;
	
		self.keybindings.update_from_jsonable(blob);
		self.keybindings.bind_all_keys();
                
		self.shell().refresh_all_flow();
		self.shell_renders([self.shell()]);
	},
	full_reset: function() {
		var self = this;
		var conf = window.confirm('THIS IS NOT AN ASCENSION!  YOU WILL LOSE EVERYTHING, INCLUDING LEVELS, FOREVER.  ARE YOU SURE?');
		if(!conf) return;

		self.level(0);
		self.experience(0);
		self.arcana_spent(0);
		self.max_infused_tier(0);
		//self.saved_fractal_patterns([]);
		_.each(self.talents(), function(tal) {
			tal.points(0);
		});

		self.ascend();
	},
	as_patch: function() {
		var self = this;
		var patch = self.$super();
		patch.talents = {};
		_.each(self.talents(), function(tal, code) {
			patch.talents[code] = tal.points();
		});
		patch.upgrades = {};
		_.each(self.upgrades(), function(upg, code) {
			patch.upgrades[code] = upg.points();
		});
		self.keybindings.save_to_patch(patch);
		patch.gameVersion = self.gameVersion;
		return patch;
	},
	update_from_jsonable: function(jsonable) {
		var self = this;
		self.sync_to_gc();

		self.$super(jsonable);

		if(!jsonable.unlocked_stats_list) {
			self.unlocked_stats_list([]);
		}
		if(!jsonable.learned_research_list) {
			self.learned_research_list([]);
		}
		if(!jsonable.boosts_list) {
			self.boosts_list([]);
		}

		_.each(jsonable.talents, function(points, code) {
			var tal = self.talents()[code];
			if(tal) {
				tal.points(points);
			}
		});

		_.each(jsonable.upgrades, function(points, code) {
			var upg = self.upgrades()[code];
			if(upg) {
				upg.points(points);
			}
		});

		if(!self.arcana()) self.arcana(0);
		if(!self.arcana_spent()) self.arcana_spent(0);
		if(!self.max_infused_tier()) self.max_infused_tier(0);
	},
	sync_to_gc: function() {
		var self = this;

		_.each(Mechs, function (mech, code) {
			if (mech.props().uncounted || mech.props().non_upgrade) return;

			if (!self.upgrades()[code]) {
				self.upgrades_list.push(Upgrade(code));
			}
		});
		_.each(Talents, function (tal, code) {
			if (!self.talents()[code]) {
				self.talents_list.push(tal);
			}
		});

		_.each(self.upgrades(), function(ug) {
			if(!Mechs[ug.code]) self.upgrades_list.remove(ug);
		});
		_.each(self.talents(), function(tal) {
			if(!Talents[tal.code]) self.talents_list.remove(tal);
		});
	},
	validate_after_load: function() {
		var self = this;
		_.each(self.talents_list(), function(tal) {
			if(tal.points() > tal.max_points(game))
			{
				tal.points(Math.max(0, tal.max_points(game)));
				if(tal.shop_mode())
				{
					var si = self.shop_slots().findIndex(function (slot) {
						return slot.mode() == tal.shop_mode();
					});
					if(si != -1)
					{
						var ss = self.shop_slots()[si];
						ss.max_tier(0);
					}
					tal.apply(self);
					if(ss?.max_tier() == 0)
					{
						self.shop_slots().splice(si,1);
						return;
					}
					ss?.tier(1);
					ss?.restock();
				}
			}
		});
		if(!self.saved_fractal_patterns())
			self.saved_fractal_patterns([]);
	},
	zoom_to_fractal: function(part) {
		var self = this;
		self.animating_shell(true);
		// renders need to be updated
		self.shell_renders()[0].fade_out(true);
		self.shell_renders.push(part.shell());
		part.shell().zoom_in(true); // This is bound to the shell_zoom binding handler.
	},
	zoom_out: function() {
		var self = this;
		if(self.shell_stack.length === 0) {
			return;
		}
		if(self.animating_shell() || self.dragging_part()) return;

		self.animating_shell(true);
		self.shell_renders()[0].zoom_out(true);
		if(self.shell_stack.length > 0)
		{
			var sh = self.shell_stack.pop();
			self.shell_renders.unshift(sh);
			sh.fade_in(true);
		}
	},
	unpause: function() {
		var self = this;
		if(!self.paused()) return;
		self.paused(false);
		self.interval = window.setInterval(_.bind(self.tick, self), 1000);
	},
	pause: function() {
		var self = this;
		if(self.paused()) return;
		self.paused(true);
		window.clearInterval(self.interval);
	},
	tick: function() {
		var self = this;
		//var st = performance.now();
		// console.log("Tick");

		_.each(self.all_parts(), function(p) {
			p.clear_buffs();
		});

		self.mana_generated(0);
		self.arcana_generated(0);
		// self.arcana(0);
		_.each(self.spent_mana(), function(sm) {
			sm.val(0);
		});

		_.each(self.connected_nodes(), function(n) {
			n.part()?.apply?.(self);
			n.part()?.tick?.(self);
		});

		_.each(self.all_parts(), function(p) {
			p.highest_stats.recompute();
		});

		var net = self.mana_generated();
		_.each(self.spent_mana(), function(sm) {
			net -= sm.val();
		});
		self.net_mana(net);

		self.save_ticks.inc(1);
		if(self.save_ticks() >= 60) {
			self.save_game();
		}

		var connected = self.connected_nodes();
		for(var x = connected.length - 1; x>= 0; x--) {
			var node = connected[x];
			// console.log("x is ", x, "node is ", node.loc);
			if(node.part() && node.part().reverse_apply) {
				// console.log("Reverse applying ", node.part());
				node.part().reverse_apply(self);
			}
		}
		//var et = performance.now();
		//console.log(`Applying and ticking took ${st-et} ms.`);
	},
	spend_mana: function(part, reason, mana, chunk) {
		var self = this;
		// console.group("spending mana", reason, mana, chunk);
		// console.trace();
		if(!chunk) chunk = mana;
		// console.log("attempting to spend ", mana);
		if(mana > self.mana()) {
			// part.staved(true);
			mana = chunk * Math.floor(self.mana() / (chunk||mana));
		}

		// if(Number.isNaN(mana)) {
		// 	// console.log("Mana is nan!!!");
		// 	// console.trace();
		// 	// return;
		// }
		if(mana) {
			self.mana.inc(-1*mana);

			var sm = self.spent_mana()[reason];
			if(!sm) {
				sm = {
					val: ko.observable(0),
					reason: reason
				};
				self.spent_mana_list.push(sm);
			}
			sm.val.inc(mana);
		}
		// console.groupEnd();
		return mana || 0;
	},
	focus_part: function(part) {
		var self = this;
		if(self.focused_part()) self.focused_part().focused(false);
		self.focused_part(part);
		part.focused(true);
		self.current_pane('upgrades');
	},
	buy_research: function(r) {
		var self = this;
		if(!r.can_buy(self)) return;
		self.mana.inc(-1 * r.mana_cost());
		self.learned_research_list.push(r.code);
		r.apply(self);
	},
	buy_upgrade: function(ug, event) {
		var self = this;
		if(!ug.can_buy(self)) return;
                
		if(event.shiftKey)
		{
			self.buy_max_upgrades(ug);
			return;
		}

		var cost = ug.arcana_cost();
		self.arcana.inc(-1 * ug.arcana_cost());
		self.arcana_spent.inc(cost);
		ug.points.inc(1);

		flash($('.available_upgrade.' + ug.code), 'green');
                
		return true;
	},
	buy_max_upgrades: function (ug) {
		var self = this;

		var number = ug.max_buyable();
		var total_arcana_cost = ug.buy_max_cost();
		self.arcana.inc(-1*total_arcana_cost);
		self.arcana_spent.inc(total_arcana_cost);
		ug.points.inc(number);

		//alert('Bought '+number+' upgrades for '+total_arcana_cost+' arcana');
		flash($('.available_upgrade.' + ug.code), 'blue');

		return true;
	},
	buy_every_upgrade: function (number) {
		var self = this;
		var totalCost = 0;
		var buyable = _.chain(game.upgrades_list()).filter(function(ug) { return ug.available(game); }).each(function(aug) {totalCost+=aug.buy_multiple_cost(number)}).value();
		if(self.arcana() > totalCost)
		{
			buyable.forEach((upgrade) => {
				upgrade.points.inc(number);
			});
			self.arcana.inc(-1*totalCost);
			self.arcana_spent.inc(totalCost);
			flash($('.available_upgrade'), 'green');
		}
		else
		{
			flash($('.buy_one_each'), 'red');
			flash($('span.arcana'), 'red');
		}

		//alert('Bought '+number+' upgrades for '+total_arcana_cost+' arcana');

		return true;
	},
	unbuy_upgrade: function(ug) {
		var self = this;
		if(ug.points() <= 0) return;
		ug.points.inc(-1);
		flash($('.available_upgrade.' + ug.code), 'red');
	},
	reset_levelling: function() {
		var self = this;
		_.each(self.upgrades(), function(ug) {
			ug.points(0);
		});
		self.arcana_spent(0);
		self.arcana(0);
		self.mana(0);
	},
	buy_talent: function(tal) {
		var self = this;
		if(!tal.can_buy(self)) return;
		tal.points.inc(1);
		tal.apply(self);
	},
	exp_for_level: function(level) {
		if(level == 1) return 0;

		return 1600*(Math.pow(2,level-1)-1);
	},
	level_after_ascend: function() {
		var self = this;
		var new_exp = self.experience() + self.arcana_spent();
                
		return Math.floor(Math.log2(new_exp/1600 +1)+1);
	},
	ascend: function() {
		var self = this;
		self.experience.inc(self.arcana_spent());
		self.arcana_spent(0);
		self.level(self.level_after_ascend());

		self.total_tp(self.level() * 1 - 1);
		self.new_game();
		self.arcana(0);

	},
	next_talent_discovered: function() {
		var self = this;
		var undiscovered = _.filter(self.talents(), function(tal) {
			return !tal.available(self);
		});
		if(undiscovered.length === 0) return null;
		return _.min(undiscovered, function(tal) {
			return tal.min_level();
		});
	},
	get_boost_factor: function(code) {
		var self = this;
		var factor = 1;

		var upg = self.upgrades()[code];
		var tal = self.boost_talents()[code];

		return 1 * (upg ? upg.boost_factor() : 1) * (tal ? tal.boost_factor() : 1);

	},
	move_to_empty_slot: function(part) {
			var empty = _.find(game.inventory_slots(), function(is) {
				return !is.part();
			});
			if(!empty) return;

			empty.set_part(part);
			game.hovered_part(null);
	},
	testRaph: function(element, raph)
	{
		var self = this;

		var elsize = new Point(60,60);
        if(!raph) {
            raph = Raphael(element, 60, 60);
            raph.outline = raph.path();
            raph.outline.attr('path', poly_path(elsize.center(), 27, 6, Math.PI/2));
            raph.outline.attr('stroke-width', 3);
        }
		raph.multipolys = {};
		raph.links = {};

		var shell = self;
		if(!shell) return raph;
		_.each(shell.nodes, function(n) {
			raph.multipolys[n.loc] = raph.path();
			var pip_ctr = new Point(n.pos.x, n.pos.y).times(0.055).plus(12, 14);
			//path.attr('path', poly_path(pip_ctr, 2, 6, Math.PI/2));
			_.each(n.links, function(l) {
				var link_path = raph.path();
				raph.links[n.loc + '.' + l.direction] = link_path;
				var angle = {
					'e': 60 * 0,
					'ne': 60 * 1,
					'nw': 60 * 2,
					'w': 60 * 3,
					'sw': 60 * 4,
					'se': 60 * 5,
				}[l.direction];
				var start_point = pip_ctr;
				var end_point = start_point.translate(angle, 4);
				var svg = [
					'M', start_point.x, start_point.y,
					'L', end_point.x, end_point.y,
				].join(' ');
				link_path.attr('path', svg);
				link_path.attr('stroke', 'transparent');
			})
		});

		_.each(raph.multipolys, function(path, loc) {
            var n = shell.nodes[loc];
            
			path.attr('fill', 'transparent');
			path.attr('stroke', 'rgba(255,255,255,0.3)');

            _.each(n.links, function(l, dir) {
                var lp = raph.links[n.loc + '.' + l.direction];
				lp.attr('stroke', 'white');
				lp.attr('stroke-opacity', 1);
            });
        });
        raph.outline.attr('fill', 'rgba(50,50,50,0.3)')

		return raph;
	},
	forget_link_pattern: function(ev)
	{
		game.saved_fractal_patterns(game.saved_fractal_patterns().filter((el) => el.pattern !== this.pattern));
	}
	// get_boost: function(code) {
	// 	var self = this;
	// 	var boost = self.boosts()[code];
	// 	if(!boost) {
	// 		boost = Boost(code);
	// 		self.boosts_list.push(boost);
	// 	}
	// 	return boost;
	// },
	// add_boost: function(code, factor) {
	// 	var self = this;
	// 	var boost = self.get_boost(code);
	// 	boost.factor(boost.factor() * factor);
	// 	return boost;
	// }
});

ShellRender = Ice.$extend('ShellRender', {
	__init__: function() {
		var self = this;
		self.$super();

	}
});

Scene = Class.$extend({
	__init__: function() {
		var self = this;
		this.$el = TEMPLATES.clone('scene');
		this.shell = null;
	},
	set_shell: function(shell) {
		// Probably need to wire up events here eventually.
		this.shell = shell;
		this.$el.empty();
		this.$el.append(shell.$el);
	}

});
