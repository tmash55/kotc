type Player = {
  name: string;
  position: string;
  statistics: {
    points: number;
    reboundsTotal: number;
    assists: number;
  };
};

type PlayerStatsProps = {
  players: Player[];
};

export default function PlayerStats({ players }: PlayerStatsProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Points</th>
            <th className="px-4 py-2">Rebounds</th>
            <th className="px-4 py-2">Assists</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
              <td className="px-4 py-2">{player.name}</td>
              <td className="px-4 py-2">{player.position}</td>
              <td className="px-4 py-2">{player.statistics.points}</td>
              <td className="px-4 py-2">{player.statistics.reboundsTotal}</td>
              <td className="px-4 py-2">{player.statistics.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
